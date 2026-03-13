# Vikrant Dey Portfolio

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Spline.

The site is focused on showcasing product engineering work across web, AI, graphics, automation, and Web3-adjacent experiments.

## Features

- Responsive portfolio site with light and dark themes
- Animated landing experience with Spline-based interactive background
- Project listing plus individual case study pages
- About, contact, and project sections tailored to Vikrant Dey
- Resume download from `public/assets/Resume.pdf`
- Contact form with optional Resend email integration
- Top-right `BT-ASSISTANT` widget by default
  - Optional realtime guestbook mode when `NEXT_PUBLIC_WS_URL` is configured

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Spline
- Radix UI
- Resend

## Local Development

Install dependencies with npm:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Environment Variables

Create `.env.local` in the project root if you want optional integrations enabled.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
RESEND_FROM_EMAIL="Portfolio <hello@yourdomain.com>"
RESEND_TO_EMAIL=deyvikrantofficial@gmail.com
NEXT_PUBLIC_WS_URL=
UMAMI_DOMAIN=
UMAMI_SITE_ID=
```

### Notes

- `NEXT_PUBLIC_SITE_URL` should be your deployed domain in production.
- `RESEND_*` variables are only needed if you want the contact form to send email.
- `NEXT_PUBLIC_WS_URL` is only needed if you want the realtime guestbook mode.
- Without `NEXT_PUBLIC_WS_URL`, the site uses the local `BT-ASSISTANT` panel instead.

## Project Structure

```text
src/app                 App Router pages and API routes
src/components          UI, layout, motion, assistant, and realtime components
src/data                Site config, constants, and project content
public/assets           Resume, profile image, Spline files, SEO assets
```

## Deployment

This project is intended to be deployed on Vercel.

### Recommended Vercel Settings

- Framework Preset: `Next.js`
- Root Directory: `.`
- Install Command: `npm install`
- Build Command: `npm run build`

### Production Environment Variables

Set these in Vercel Project Settings:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
RESEND_API_KEY=
RESEND_FROM_EMAIL="Portfolio <hello@yourdomain.com>"
RESEND_TO_EMAIL=deyvikrantofficial@gmail.com
NEXT_PUBLIC_WS_URL=
UMAMI_DOMAIN=
UMAMI_SITE_ID=
```

### Important Deployment Notes

- The contact form will not send emails until `RESEND_API_KEY` and sender details are configured.
- The portfolio deploys cleanly without a websocket backend.
- If you later want realtime guestbook behavior, host a websocket server separately and set `NEXT_PUBLIC_WS_URL`.

## Content Notes

- Resume file path: `public/assets/Resume.pdf`
- About image path: `public/assets/me.jpg`
- Favicon path: `public/assets/favicon.ico`

## Status

The site currently excludes the old blog system and no longer depends on `src/content/blogs`.
