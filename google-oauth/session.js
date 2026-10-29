require("dotenv").config();

const express = require("express");
const session = require("express-session");
const crypto = require("crypto");
const { google } = require("googleapis");

const app = express();
const PORT = 3000;

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  SESSION_SECRET,
} = process.env;

if (
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_CLIENT_SECRET ||
  !GOOGLE_CALLBACK_URL ||
  !SESSION_SECRET
) {
  throw new Error("OAuth environment variables are missing");
}

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
);

// Untuk demo localhost saja.
// Gunakan session store persisten dan HTTPS di production.
app.use(
  session({
    name: "demo.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // localhost HTTP; wajib HTTPS di production
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    },
  }),
);

app.get("/", (req, res) => {
  if (req.session.user) {
    return res.send(`
      <h1>Welcome, ${escapeHtml(req.session.user.name || "User")}</h1>
      <p>${escapeHtml(req.session.user.email || "")}</p>
      <a href="/logout">Logout</a>
    `);
  }

  res.send('<a href="/auth/google">Login with Google</a>');
});

// 1. Mulai OAuth flow
app.get("/auth/google", (req, res, next) => {
  const state = crypto.randomBytes(32).toString("hex");
  req.session.oauthState = state;

  req.session.save((err) => {
    if (err) return next(err);

    console.log("[DEBUG] Session saved");
    console.log("[DEBUG] Session ID exists:", Boolean(req.sessionID));
    console.log("[DEBUG] Session ID:", req.sessionID);
    console.log(
      "[DEBUG] Session state exists:",
      Boolean(req.session.oauthState),
    );

    const url = oauth2Client.generateAuthUrl({
      response_type: "code",
      scope: ["openid", "email", "profile"],
      state,
    });

    res.redirect(url);
  });
});

// 2. Google mengembalikan user ke callback

app.get("/auth/google/callback", async (req, res, next) => {
  try {
    const { code, state } = req.query;

    // Validasi state tetap dipertahankan.
    const expectedState = req.session.oauthState;
    delete req.session.oauthState;

    const validState =
      typeof state === "string" &&
      typeof expectedState === "string" &&
      Buffer.byteLength(state) === Buffer.byteLength(expectedState) &&
      crypto.timingSafeEqual(Buffer.from(state), Buffer.from(expectedState));

    if (!validState) {
      console.warn("[SESSION LAB] OAuth state ditolak");
      return res.status(403).send("Invalid OAuth state");
    }

    if (typeof code !== "string") {
      return res.status(400).send("Missing authorization code");
    }

    console.log("[SESSION LAB] Authorization code diterima");

    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.id_token) {
      return res.status(401).send("Missing ID token");
    }

    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.sub || payload.email_verified !== true) {
      return res.status(401).send("Identity verification failed");
    }

    console.log("[SESSION LAB] Identitas Google terverifikasi");

    // VULNERABLE: session lama langsung diberi identitas login.
    // Tidak ada req.session.regenerate().
    req.session.user = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
    };

    console.warn("[SESSION LAB] Login sukses tanpa regenerasi session");
    console.log("[DEBUG] Session ID:", req.sessionID);

    req.session.save((err) => {
      if (err) return next(err);

      console.log("[SESSION LAB] Session tersimpan");
      res.redirect("/");
    });
  } catch (err) {
    console.error("[SESSION LAB] OAuth gagal:", err.name);
    next(err);
  }
});

app.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie("demo.sid");
    res.redirect("/");
  });
});

app.use((err, req, res, next) => {
  console.error("OAuth error:", err.message);
  res.status(500).send("Authentication failed");
});

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
