# Web Security Learning Roadmap

## Tujuan

Membangun pemahaman mendalam tentang keamanan aplikasi web, mulai dari komunikasi jaringan, arsitektur aplikasi, browser security, security concepts, hingga vulnerability research.

Fokus utama:

- Memahami cara kerja aplikasi web.
- Memahami mekanisme keamanan.
- Memahami penyebab vulnerability.
- Mampu melakukan security testing.
- Mampu menganalisis dan menjelaskan dampak vulnerability.

---

# 1. Networking & Web Communication

## 1.1 Networking Fundamentals

- [ ] OSI Model
- [ ] TCP/IP Model
- [ ] IP Address
- [ ] Subnet dan CIDR
- [ ] MAC Address
- [ ] ARP
- [ ] Routing
- [ ] NAT
- [ ] TCP dan UDP
- [ ] TCP Three-Way Handshake
- [ ] Ports dan Sockets
- [ ] Firewall
- [ ] Proxy dan Reverse Proxy

## 1.2 DNS

- [ ] Domain dan Nameserver
- [ ] DNS Resolver
- [ ] Recursive dan Iterative Query
- [ ] Authoritative Nameserver
- [ ] DNS Records: A, AAAA, CNAME, MX, NS, TXT, SOA
- [ ] DNS Caching
- [ ] TTL
- [ ] DNS Zone Transfer
- [ ] DNSSEC
- [ ] DNS Misconfiguration

## 1.3 HTTP Protocol

- [ ] HTTP Request dan Response
- [ ] Request Line dan Status Line
- [ ] HTTP Methods
- [ ] HTTP Status Codes
- [ ] HTTP Headers
- [ ] URL Structure
- [ ] Query Parameters
- [ ] Request Body
- [ ] Content-Type
- [ ] Content-Length
- [ ] Cookies
- [ ] Keep-Alive
- [ ] HTTP/1.1
- [ ] HTTP/2
- [ ] HTTP/3

## 1.4 HTTPS & TLS

- [ ] HTTP vs HTTPS
- [ ] TLS Handshake
- [ ] Symmetric Encryption
- [ ] Asymmetric Encryption
- [ ] Digital Certificates
- [ ] Certificate Authority
- [ ] Certificate Validation
- [ ] TLS Versions
- [ ] HSTS
- [ ] TLS Misconfiguration

---

# 2. Web Application Architecture

## 2.1 Client-Server Architecture

- [ ] Client dan Server
- [ ] Frontend dan Backend
- [ ] Web Server
- [ ] Application Server
- [ ] Database Server
- [ ] Reverse Proxy
- [ ] Load Balancer
- [ ] CDN
- [ ] Monolithic Architecture
- [ ] Microservices Architecture
- [ ] Server-Side Rendering
- [ ] Single Page Application

## 2.2 Backend Fundamentals

- [ ] Routing
- [ ] Middleware
- [ ] Controllers
- [ ] Services
- [ ] Request Lifecycle
- [ ] Input Validation
- [ ] Output Encoding
- [ ] Error Handling
- [ ] Logging
- [ ] Environment Configuration
- [ ] Dependency Management

## 2.3 Database Fundamentals

- [ ] Relational Database
- [ ] Tables dan Relationships
- [ ] Primary Key dan Foreign Key
- [ ] SQL Queries
- [ ] JOIN
- [ ] GROUP BY
- [ ] Index
- [ ] Transactions
- [ ] ACID
- [ ] ORM
- [ ] NoSQL Fundamentals
- [ ] Database Permissions

## 2.4 API Architecture

- [ ] API Fundamentals
- [ ] REST API
- [ ] HTTP API Design
- [ ] JSON API
- [ ] GraphQL
- [ ] WebSocket
- [ ] API Authentication
- [ ] API Authorization
- [ ] API Versioning
- [ ] Rate Limiting
- [ ] Pagination

---

# 3. Browser Security & Security Mechanisms

## 3.1 Browser Internals

- [ ] Browser Architecture
- [ ] Rendering Engine
- [ ] JavaScript Engine
- [ ] DOM
- [ ] Browser Storage
- [ ] Cookies
- [ ] Local Storage
- [ ] Session Storage
- [ ] IndexedDB
- [ ] Same-Origin Policy
- [ ] Origin
- [ ] Site dan Schemeful Same-Site
- [ ] iframe
- [ ] postMessage
- [ ] Service Workers
- [ ] Browser Cache
- [ ] Back-Forward Cache

## 3.2 Browser Security Policies

- [ ] Same-Origin Policy
- [ ] Cross-Origin Resource Sharing (CORS)
- [ ] Content Security Policy (CSP)
- [ ] HTTP Strict Transport Security (HSTS)
- [ ] X-Frame-Options
- [ ] Referrer-Policy
- [ ] Permissions-Policy
- [ ] Cross-Origin Resource Policy (CORP)
- [ ] Cross-Origin Opener Policy (COOP)
- [ ] Cross-Origin Embedder Policy (COEP)
- [ ] Fetch Metadata Headers

## 3.3 Cookie & Session Security

- [ ] Cookie Lifecycle
- [ ] Cookie Scope
- [ ] Domain Attribute
- [ ] Path Attribute
- [ ] HttpOnly
- [ ] Secure
- [ ] SameSite
- [ ] Session ID
- [ ] Session Regeneration
- [ ] Session Expiration
- [ ] Session Invalidation
- [ ] Session Fixation
- [ ] Session Hijacking

## 3.4 Authentication

- [ ] Authentication Fundamentals
- [ ] Password Storage
- [ ] Password Hashing
- [ ] Salt
- [ ] Multi-Factor Authentication
- [ ] Session-Based Authentication
- [ ] Token-Based Authentication
- [ ] JWT
- [ ] OAuth 2.0
- [ ] OpenID Connect
- [ ] Single Sign-On
- [ ] Password Reset Flow
- [ ] Account Recovery

## 3.5 Authorization

- [ ] Authentication vs Authorization
- [ ] Role-Based Access Control (RBAC)
- [ ] Attribute-Based Access Control (ABAC)
- [ ] Object-Level Authorization
- [ ] Function-Level Authorization
- [ ] Resource Ownership
- [ ] Multi-Tenant Authorization
- [ ] Privilege Escalation

---

# 4. Security Concepts & Principles

Bagian ini menjadi dasar cara berpikir dalam menganalisis keamanan sistem.

## 4.1 CIA Triad

### Confidentiality

Menjaga agar informasi hanya dapat diakses oleh pihak yang berwenang.

Contoh:

- User A tidak boleh membaca data pribadi User B.
- Password tidak boleh disimpan dalam plaintext.
- Data sensitif harus dilindungi ketika dikirim.

Contoh vulnerability:

- IDOR
- Sensitive Information Disclosure
- Broken Access Control

### Integrity

Menjaga agar data tidak diubah oleh pihak yang tidak berwenang.

Contoh:

- User tidak boleh mengubah saldo akun.
- User tidak boleh mengubah harga produk.
- Data transaksi harus tetap konsisten.

Contoh vulnerability:

- Parameter Tampering
- Mass Assignment
- Unauthorized Data Modification

### Availability

Memastikan sistem tersedia ketika dibutuhkan oleh pengguna yang berwenang.

Contoh:

- Website tetap dapat diakses.
- API memiliki rate limiting.
- Sistem memiliki mekanisme recovery.

Contoh vulnerability:

- Denial of Service
- Uncontrolled Resource Consumption
- Race Condition

## 4.2 AAA Security Model

- [ ] Authentication
- [ ] Authorization
- [ ] Accounting

Contoh:

1. Authentication memverifikasi identitas user.
2. Authorization memeriksa hak akses user.
3. Accounting mencatat aktivitas user.

Contoh vulnerability:

- Authentication Bypass
- Broken Access Control
- Privilege Escalation
- Insufficient Logging

## 4.3 Least Privilege

Setiap user, process, atau service hanya diberikan hak akses minimum yang dibutuhkan.

Contoh:

- User biasa hanya dapat melihat profil sendiri.
- User biasa tidak dapat mengubah role menjadi admin.
- Service database tidak perlu memiliki permission administrator.

Risiko jika tidak diterapkan:

- Privilege Escalation
- Broken Access Control
- Excessive Permissions

## 4.4 Defense in Depth

Menggunakan beberapa lapisan keamanan agar kegagalan satu lapisan tidak langsung menyebabkan sistem sepenuhnya terekspos.

Contoh:

User Request
|
v
WAF
|
v
Authentication
|
v
Authorization
|
v
Input Validation
|
v
Application
|
v
Database Permission

Jika WAF gagal mendeteksi request berbahaya, aplikasi tetap harus mempunyai validasi input dan kontrol akses.

## 4.5 Zero Trust

Tidak otomatis mempercayai user atau service hanya karena berada di dalam jaringan internal.

Contoh:

- Setiap request harus divalidasi.
- Setiap service harus memverifikasi identitas service lain.
- User harus memiliki izin untuk setiap resource yang diakses.

Risiko jika tidak diterapkan:

- Lateral Movement
- Unauthorized Access
- Excessive Trust Between Services

## 4.6 Attack Surface

Seluruh titik yang dapat digunakan untuk berinteraksi dengan aplikasi dan berpotensi menjadi jalur serangan.

Contoh:

- Login endpoint
- Registration endpoint
- API endpoint
- File upload
- Password reset
- OAuth callback
- Admin dashboard

## 4.7 Trust Boundary

Batas antara komponen atau pihak dengan tingkat kepercayaan berbeda.

Contoh:

Browser
|
| Untrusted Input
v
Backend
|
| Validated Data
v
Database

Backend tidak boleh menganggap input dari browser sebagai data tepercaya.

## 4.8 Fail-Safe Defaults

Secara default, akses harus ditolak kecuali izin diberikan secara eksplisit.

Contoh:

```javascript
function canAccess(user, resource) {
  if (!user) return false;

  return user.id === resource.ownerId;
}
```
