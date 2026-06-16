# 📰 The Daily Jhalokathi

> A full-stack modern Bengali news portal built with **Next.js 16**, **React 19**, and **MongoDB** — featuring real-time breaking news, role-based access control, and a complete admin dashboard.

---

## 🌐 Live Features at a Glance

| Feature                 | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| 🏠 Public Home Page     | Latest news, category filtering, featured/side stories             |
| 📡 Breaking News Ticker | Real-time scrolling ticker on the home page                        |
| 📄 News Detail Pages    | Related news, social sharing, comments & replies                   |
| 🔐 JWT Authentication   | Secure login with `accessToken` + `refreshToken` HTTP-only cookies |
| 🛡️ Admin Dashboard      | Full management of news, users, comments, replies, and contacts    |
| 🖼️ Image Uploads        | Cloud-based image hosting via Cloudinary                           |
| ☁️ Weather Widget       | Live weather data via public weather API                           |

---

## 🛠️ Tech Stack

| Category         | Technology               | Version  |
| ---------------- | ------------------------ | -------- |
| Framework        | Next.js                  | `16.2.4` |
| UI Library       | React                    | `19.2.4` |
| Database         | MongoDB (Native Driver)  | Latest   |
| Authentication   | JWT / Jose               | Latest   |
| Password Hashing | bcrypt                   | Latest   |
| Image Hosting    | Cloudinary               | Latest   |
| Styling          | Tailwind CSS 4 + DaisyUI | Latest   |

---

## 📁 Project Structure (Key Routes)

| Route                      | Type      | Description                |
| -------------------------- | --------- | -------------------------- |
| `/`                        | Public    | Home page with news feed   |
| `/news/[id]`               | Public    | News details with comments |
| `/contact`                 | Public    | Contact form               |
| `/login`                   | Public    | Login / Registration UI    |
| `/profile`                 | Protected | User profile page          |
| `/dashboard`               | Admin     | Admin overview             |
| `/dashboard/news`          | Admin     | Manage all news articles   |
| `/dashboard/news/create`   | Admin     | Create a new news article  |
| `/dashboard/breaking-news` | Admin     | Create breaking news       |
| `/dashboard/contact`       | Admin     | View contact messages      |
| `/dashboard/comment`       | Admin     | Manage all comments        |
| `/dashboard/replay`        | Admin     | Manage all replies         |
| `/dashboard/users`         | Admin     | Manage registered users    |

---

## 🔒 API Security Model

| API Route                            | Access Level      | Notes                                 |
| ------------------------------------ | ----------------- | ------------------------------------- |
| `GET /api/public/AllNews`            | 🟢 Public         | Returns only UI-required fields (DTO) |
| `GET /api/public/breakingnews`       | 🟢 Public         | Public breaking news feed             |
| `GET/POST/PATCH/DELETE /api/AllNews` | 🔴 Admin Only     | Full CRUD for news                    |
| `GET/POST /api/breakingnews`         | 🔴 Admin Only     | Create/manage breaking news           |
| `GET/DELETE /api/contact`            | 🔴 Admin Only     | View and delete contact messages      |
| `POST /api/contact`                  | 🟡 Logged-in User | Email pulled from JWT token           |
| `POST /api/comments`                 | 🟡 Logged-in User | Requires valid session                |
| `POST /api/replies`                  | 🟡 Logged-in User | Requires valid session                |

> ✅ **Security principle:** Public readers only access `/api/public/*` DTOs. Full data is locked behind admin-only authenticated routes.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# Auth Secrets
NEXTAUTH_SECRET=your_access_token_secret
NEXTAUTH_REFRESH_SECRET=your_refresh_token_secret

# Admin Configuration
ADMIN_EMAILS=admin@example.com
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com

# Cloudinary (Image Uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Weather Widget
NEXT_PUBLIC_WEATHER_KEY=your_openweather_api_key
```

### ⚡ ডেমো অ্যাকাউন্ট (Demo Credentials)

লগইন টেস্ট করার জন্য নিচের ডেমো অ্যাকাউন্টগুলোর ক্রেডেনশিয়াল ব্যবহার করতে পারেন। ইমেইল বা পাসওয়ার্ডের ওপর ডাবল-ক্লিক করে সহজেই কপি করে নেওয়া যাবে:

| Role         | Email (E:)        | Password (P:) |
| :----------- | :---------------- | :------------ |
| 🔴 **Admin** | `admin@gmail.com` | `admin123`    |
| 🟢 **User**  | `user@gmail.com`  | `user123`     |

> 📋 **টিপস:** প্রজেক্টটি লোকালি রান করার পর কাস্টম ক্রেডেনশিয়াল ফর্মের মাধ্যমে এই ডাটা দিয়ে সরাসরি অ্যাডমিন ড্যাশবোর্ড বা ইউজার হোম পেজ টেস্ট করতে পারবেন।

> ⚠️ Only `NEXT_PUBLIC_*` prefixed variables are exposed to the browser. Keep all secrets server-side.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Copy the variables above into `.env.local` and fill in your values.

### 3. Run Locally

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📜 Available Scripts

| Script      | Command         | Description                       |
| ----------- | --------------- | --------------------------------- |
| Development | `npm run dev`   | Start dev server with hot reload  |
| Build       | `npm run build` | Create optimized production build |
| Production  | `npm run start` | Run the production build          |
| Lint        | `npm run lint`  | Check for code style issues       |

---

## 🤖 AI-Assisted Problem Solving

This project leveraged AI tools throughout development to solve real challenges:

| Problem Area           | Challenge                                                            | AI-Assisted Solution                                                                   |
| ---------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 🔐 Auth Architecture   | Implementing secure JWT with HTTP-only cookies in Next.js App Router | Designed dual-token (access + refresh) flow with middleware-based route protection     |
| 🛡️ API Protection      | Separating public and admin-only data without duplicating logic      | Introduced DTO pattern at `/api/public/*` to safely expose only required fields        |
| 🖼️ Image Uploads       | Handling Cloudinary uploads on the client without exposing secrets   | Used unsigned upload presets with `NEXT_PUBLIC_` keys, keeping API secrets server-side |
| 📦 MongoDB Integration | Using MongoDB native driver efficiently without an ORM               | Implemented connection pooling and reusable `connectDB` utility                        |
| 💬 Comment System      | Nested comments and replies with delete/manage capability            | Built threaded structure with separate collections and admin management routes         |
| 📡 Breaking News       | Real-time scrolling ticker without WebSockets                        | Implemented CSS marquee-based ticker with API-driven content refresh                   |
| 🌤️ Weather Widget      | Displaying live weather on the public homepage                       | Integrated OpenWeatherMap API using a public `NEXT_PUBLIC_WEATHER_KEY`                 |
| 🔄 Token Refresh       | Preventing session expiry on active users                            | Built silent refresh logic using `refreshToken` cookie and middleware interception     |

---

## 🙋 Common Interview Questions About This Project

**Q: Why did you choose Next.js for this project?**

> Next.js 16 gives us server-side rendering for SEO (critical for a news portal), API routes for the backend, and the App Router for clean layout nesting. It's a full-stack solution in one framework.

**Q: How does authentication work?**

> JWT tokens are issued on login — an `accessToken` (short-lived) and a `refreshToken` (long-lived) — both stored as HTTP-only cookies. Middleware validates tokens on protected routes, and the refresh flow silently renews the access token when it expires.

**Q: How did you protect admin routes?**

> All admin APIs verify the JWT and check if the user's email matches `ADMIN_EMAILS`. Public APIs serve DTOs with minimal fields only. The separation ensures no sensitive data leaks through public endpoints.

**Q: How do you handle image uploads securely?**

> Images are uploaded directly from the browser to Cloudinary using unsigned upload presets. The preset name and cloud name are public, but the API key and secret stay on the server and are only used for server-side operations.

**Q: What was the hardest problem you solved?**

> Implementing a clean and secure API separation — public DTOs vs. admin routes — while avoiding code duplication. AI helped design a pattern where the public routes call the same database queries but filter the returned fields before sending the response.

---

## 📌 Notes

- Public news APIs return **only the fields needed by the UI** (title, image, category, timestamp).
- Full article content, contact form submissions, and user data are **admin-only**.
- Always keep sensitive keys on the server — only use `NEXT_PUBLIC_` prefix for truly public values.

---

<p align="center">Made with ❤️ using Next.js, MongoDB, and Tailwind CSS</p>
