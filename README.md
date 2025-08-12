# Angular Client Assignment (Routing + API + Reactive Forms)

Live Demo: **[https://angluar-assignment.vercel.app](https://angluar-assignment.vercel.app)**  
Repo: _(add this GitHub repo URL after you push)_

---

## ✨ Features

- Angular 18+ (standalone components)
- Client-side routing: **Home**, **API Data**, **Contact Form**
- API service with **HttpClient** (JSONPlaceholder API)
- Reactive Form with validation (name, email, message)
- Instant UI update after submit (newly created post appears on API Data page)

---

## 🧰 Tech Stack

- **Angular** (standalone components, Angular Router, Reactive Forms)
- **TypeScript**, **SCSS**
- **HttpClient** for API calls

---

## 📦 Getting Started

```bash
# 1) Install dependencies
npm install

# 2) Run development server
ng serve -o
# App will open at: http://localhost:4200
```

---

## 🗺️ App Navigation

- `/` → Home (intro page)
- `/api-data` → Fetches posts from API and lists them
- `/contact` → Reactive form; posts data to API

---

## 🔌 API Details

**Base URL:** [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)

**Endpoints used:**

- **GET** `/posts?_limit=10` → Returns 10 posts
- **POST** `/posts` → Creates a new post

Example POST body:

```json
{
  "title": "Your Name",
  "body": "Your message",
  "userId": 1
}
```

> You can swap to your own API (e.g., a Next.js backend) by updating the `baseUrl` in
> `src/app/core/api.service.ts`.

---

## 🧪 How to Test

1. Navigate to `/api-data` → You should see \~10 posts loaded from the API.
2. Navigate to `/contact` → Fill out the form (name, valid email, and a message with at least 10 characters).
3. Submit the form → You should see a success message.
4. Go back to `/api-data` → Your new message should appear at the top of the list.

---

## 🏗️ Build

```bash
ng build --configuration production
# Output will be in: dist/client-assignment
```

---

## 🚀 Deploy on Vercel

### Deploy from GitHub (Recommended)

1. Push this repo to GitHub.
2. Go to [Vercel](https://vercel.com) → **New Project** → Import GitHub repo.
3. Settings:

   - Framework Preset: **Angular**
   - Build Command: `ng build --configuration production`
   - Output Directory: `dist/client-assignment`

4. Deploy.

**SPA Routing fix** (to prevent 404 on refresh for `/api-data` or `/contact`):
Add `vercel.json` at repo root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Deploy using Vercel CLI

```bash
ng build --configuration production
# Ensure vercel.json is in dist/client-assignment
vercel --prod dist/client-assignment
```

---

## 🗂️ Project Structure

```
src/
  app/
    core/
      api.service.ts
    pages/
      home/
      api-data/
      contact-form/
    app.ts
    app.routes.ts
    app.config.ts
styles.scss
vercel.json
```

---

## 🐞 Troubleshooting

- **404 on refresh** → Ensure `vercel.json` is present at repo root (or in `dist` if deploying via CLI).
- **HttpClient errors** → Check that `provideHttpClient()` is included in `app.config.ts`.
- **Form data not showing in API Data** → Make sure in-memory update logic exists in `api.service.ts`.

---

## 📜 License

MIT

```

---

If you want, I can also give you the **exact Git commands** to push your whole Angular project (with `.gitignore` and this `README.md`) to GitHub so it’s instantly linked to Vercel.
Do you want me to prepare those commands next?
```
