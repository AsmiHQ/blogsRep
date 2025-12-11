# HQ Blogs

A beautiful, modern blog website built with Next.js and connected to Strapi CMS.

## Features

- 🚀 **Server-side rendering** with Next.js for optimal performance and SEO
- 📝 **Strapi CMS integration** - publish articles in Strapi and they go live automatically
- 🎨 **Modern, dark-themed design** with amber accents and smooth animations
- 📱 **Fully responsive** - looks great on all devices
- ⚡ **Auto-revalidation** - content updates every 60 seconds without rebuilding
- 🔍 **SEO optimized** with dynamic metadata for each article

## Setup

### 1. Configure Strapi URL

Create a `.env.local` file in the root of `website_1`:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and set your Strapi URL:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Replace with your actual Strapi instance URL (e.g., `https://your-strapi.onrender.com`).

### 2. Strapi Content Type Requirements

Your Strapi should have an `Article` content type with these fields:

| Field | Type | Description |
|-------|------|-------------|
| `title` | Text | The article title |
| `description` | Text | Short description/excerpt |
| `slug` | UID | URL-friendly identifier (based on title) |
| `body` | Rich Text / Long Text | The main article content |

### 3. Strapi API Permissions

Make sure your Strapi has public read access enabled:

1. Go to **Settings** → **Users & Permissions plugin** → **Roles** → **Public**
2. Under **Article**, check `find` and `findOne`
3. Save

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog!

## How It Works

1. **Homepage (`/`)** - Fetches all published articles from Strapi and displays them as cards
2. **Article Page (`/blog/[slug]`)** - Fetches a single article by its slug and renders the content

Articles are automatically revalidated every 60 seconds, so any changes you make in Strapi will appear on the website within a minute.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add the environment variable `NEXT_PUBLIC_STRAPI_URL` with your Strapi URL
4. Deploy!

## Project Structure

```
website_1/
├── app/
│   ├── blog/
│   │   └── [slug]/
│   │       ├── page.tsx      # Individual article page
│   │       └── not-found.tsx # 404 page for articles
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Homepage with article listing
├── lib/
│   └── strapi.ts             # Strapi API service
└── .env.example              # Environment variables template
```

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **CMS**: Strapi
- **Font**: Outfit (Google Fonts)
- **Language**: TypeScript
