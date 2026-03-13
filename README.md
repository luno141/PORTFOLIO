# Vikrant Dey Portfolio

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Spline.

The site is centered on product engineering work across full-stack web, AI systems, graphics, automation, and Web3-adjacent experiments.

## Features

- Responsive portfolio with light and dark themes
- Spline-based animated background and interactive keyboard section
- Project listing plus individual case study pages
- About, contact, and projects pages tailored to Vikrant Dey
- Resume download from `public/assets/Resume.pdf`
- Contact form with direct-contact fallback when Resend is not configured
- Top-right `BT-ASSISTANT` widget by default
- Optional realtime guestbook / cursor mode when `NEXT_PUBLIC_WS_URL` is configured
- Floating `TETRIS` mini-game
- Footer social links for GitHub, LinkedIn, and Instagram

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Spline
- Radix UI
- Socket.IO client
- Resend

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Environment Variables

Create `.env.local` in the project root for optional integrations:

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

- `NEXT_PUBLIC_SITE_URL` should be your real production domain when deployed.
- `RESEND_*` variables are only required if you want the contact form to send email.
- Without Resend, the contact section falls back to direct email / LinkedIn / GitHub links.
- `NEXT_PUBLIC_WS_URL` is optional. Without it, the site uses the local `BT-ASSISTANT`.
- If `NEXT_PUBLIC_WS_URL` is set, the realtime guestbook / cursor mode becomes active.

## Project Structure

```text
src/app                 App Router pages and API routes
src/components          UI, layout, motion, assistant, game, and realtime components
src/data                Site config, constants, and project content
public/assets           Resume, profile image, Spline files, sounds, favicon, SEO assets
```

## Assets

- Resume: `public/assets/Resume.pdf`
- About image: `public/assets/me.jpg`
- Favicon: `public/assets/favicon.ico`
- Keyboard scene: `public/assets/skills-keyboard.spline`
- 404 scene: `public/assets/404.spline`

## Deployment

The project builds cleanly for both Vercel and Netlify.

### Vercel

- Framework Preset: `Next.js`
- Root Directory: `.`
- Install Command: `npm install`
- Build Command: `npm run build`

### Netlify

- Build Command: `npm run build`
- Publish Directory: `.next`

Use the same environment variables listed above in your hosting dashboard.

### Deployment Notes

- The site works without a websocket backend.
- The contact form will not send emails until Resend is configured.
- Realtime guestbook behavior requires a separate websocket backend.

## Development Notes

- The old blog system has been removed.
- The default interactive widget is `BT-ASSISTANT`, not the guestbook.
- If `next dev` gets into a stale asset-cache state, clear `.next` and restart:

```bash
rm -rf .next
npm run dev
```
