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
app.get("/auth/google", (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");

  req.session.oauthState = state;

  const url = oauth2Client.generateAuthUrl({
    response_type: "code",
    scope: ["openid", "email", "profile"],
    state,
  });

  console.log(url);
  res.redirect(url);
});

// 2. Google mengembalikan user ke callback
app.get("/auth/google/callback", async (req, res, next) => {
  try {
    const { code, error } = req.query;

    if (error) {
      return res.status(400).send("Google login was cancelled or denied");
    }

    if (typeof code !== "string") {
      return res.status(400).send("Missing authorization code");
    }

    if (typeof code !== "string") {
      return res.status(400).send("Missing authorization code");
    }

    // 3. Tukar authorization code dengan token di server
    const { tokens } = await oauth2Client.getToken(code);

    console.log("tokens", tokens);

    if (!tokens.id_token) {
      return res.status(401).send("Missing Google ID token");
    }

    // 4. Verifikasi signature dan audience ID token
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    console.log("payload", payload);

    if (!payload || !payload.sub || payload.email_verified !== true) {
      return res.status(401).send("Google identity could not be verified");
    }

    // 5. Buat session baru setelah login berhasil
    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.user = {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };

      req.session.save((err) => {
        if (err) return next(err);
        res.redirect("/");
      });
    });
  } catch (err) {
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
