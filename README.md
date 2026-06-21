# eTuitionBd Client Side

## Project Name

- eTuitionBd

## Purpose

eTuitionBd is a React + Vite based tutor and tuition marketplace web application. It enables students to discover tutors, save favorite tutors and tuition posts, post tuition requests, and manage dashboard workflows across student, tutor, and admin roles.

## Features

- Responsive student dashboard with saved items, posted tuitions, payments, and profile settings
- Tutor discovery, tutor detail pages, and saved tutor bookmarks
- Tuition listing and tuition detail pages with student-only bookmark support
- Role-based routing and access control for student, tutor, and admin users
- Email/password authentication plus Google login with Firebase
- JWT authentication via API integration
- Stripe integration for checkout and payment success flows
- Data-driven UI with React Query
- TailwindCSS + DaisyUI for styling
- Recharts charts for analytics and dashboard visuals

## Live URL

- Live URL: `https://etuitionbd-by-sumu.web.app`

## GitHub Repository Link
- Frontend Repo: `https://github.com/sumu749/eTuitionBd-server-side`
- Backend source code: `https://github.com/sumu749/eTuitionBd-server-side`


## Packages Used

### Runtime dependencies

- `react`
- `react-dom`
- `react-router`
- `@tanstack/react-query`
- `axios`
- `firebase`
- `react-hook-form`
- `react-hot-toast`
- `react-icons`
- `lucide-react`
- `framer-motion`
- `recharts`
- `sweetalert2`
- `daisyui`
- `tailwindcss`
- `@stripe/react-stripe-js`
- `@stripe/stripe-js`
- `@tailwindcss/vite`

### Development dependencies

- `vite`
- `@vitejs/plugin-react`
- `eslint`
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `@types/react`
- `@types/react-dom`
- `globals`

## Getting Started

1. Create a `.env` file at the project root with your Firebase and Stripe values:

    ```bash
    cp .env.example .env
    ```

2. Add the required environment variables to `.env`:

    ```env
    VITE_API_KEY=your_firebase_api_key
    VITE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_PROJECT_ID=your_firebase_project_id
    VITE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_APP_ID=your_firebase_app_id
    VITE_API_URL=https://your-api-base-url
    VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    VITE_CONTACT_ENDPOINT=/contacts
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Preview the production build locally:

    ```bash
    npm run preview
    ```

6. Build for production:

    ```bash
    npm run build
    ```

## Demo Credentials

### Student Account

- **Email:** hablu@gmail.com
- **Password:** Hablu@749

### Admin Account

- **Email:** admin749@gmail.com
- **Password:** @@Admin749@@

---
