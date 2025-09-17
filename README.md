# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS, featuring 3D animations and GitHub markdown integration.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **3D Animations**: Three.js integration with React Three Fiber
- **GitHub Integration**: Automatic markdown notes from GitHub repositories
- **Search & Filtering**: Fuse.js powered search with URL-synced filters
- **Performance**: Optimized animations with reduced motion support
- **Accessibility**: Full keyboard navigation and screen reader support

## GitHub Markdown Integration

This portfolio automatically fetches and displays markdown notes from the `drxadz/oscp-prep` repository.

### How it works

1. **Build-time indexing**: The `scripts/build-notes-index.js` script fetches all `.md` files from the GitHub repository
2. **Static generation**: Creates `public/notes-index.json` with parsed frontmatter and content
3. **Dynamic routing**: Each markdown file becomes a static page at `/notes/{slug}`
4. **Auto-rebuild**: GitHub Actions automatically rebuild the site when the notes repository is updated

### Setup

#### 1. GitHub Token (for private repos)

If your `oscp-prep` repository is private, you'll need a GitHub token:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` scope
3. Add it to your site repository secrets as `GITHUB_TOKEN`

#### 2. Auto-rebuild setup

**In your site repository** (this one):
- The workflow `.github/workflows/rebuild-on-dispatch.yml` is already configured
- It listens for `repository_dispatch` events and rebuilds the site

**In your notes repository** (`drxadz/oscp-prep`):
1. Add the workflow `.github/workflows/notify-site-on-push.yml`
2. Set up repository secrets:
   - `PERSONAL_ACCESS_TOKEN`: Your GitHub token with `repo` scope
   - `SITE_REPO`: Your site repository name (e.g., `drxadz/new-portfolio`)

#### 3. Local development

```bash
# Install dependencies
npm install

# Build notes index and start dev server
npm run build
npm run dev

# Or build for production
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Section, Container, etc.)
│   ├── Navbar.tsx      # Navigation with mobile drawer
│   ├── Hero3D.tsx      # 3D hero section
│   └── ...
├── pages/              # Route components
│   ├── Works.tsx       # Works listing page
│   ├── Notes.tsx       # Notes listing page
│   └── NoteDetail.tsx  # Individual note page
├── data/               # Static data files
│   └── works.json      # Sample works data
├── lib/                # Utilities
│   └── motion.ts       # Framer Motion variants
└── three/              # 3D components
    └── ...
```

## Adding Content

### Adding Works

Edit `src/data/works.json` to add new work entries:

```json
{
  "id": "works-001",
  "title": "Project Title",
  "type": "case-study",
  "topics": ["topic1", "topic2"],
  "category": "Category Name",
  "tags": ["tag1", "tag2"],
  "date": "2024-01-01",
  "summary": "Brief description",
  "contentLink": "/works/works-001",
  "readingTime": "5 min",
  "popularity": 100
}
```

### Adding Notes

Notes are automatically pulled from your GitHub repository. To add a new note:

1. Create a `.md` file in your `oscp-prep` repository
2. Add frontmatter at the top:

```markdown
---
title: "Note Title"
tags: ["tag1", "tag2"]
date: "2024-01-01"
excerpt: "Brief description"
---

# Your content here
```

3. Push to the `main` branch
4. The site will automatically rebuild and include your new note

## Search Configuration

The search uses Fuse.js with the following configuration:

- **Keys**: `title` (60%), `excerpt` (25%), `tags` (10%), `category` (5%)
- **Threshold**: 0.35 (fuzzy matching)
- **Features**: Ignores location, includes match highlighting

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Set environment variables:
   - `GITHUB_TOKEN` (if using private repo)
3. Deploy

### Netlify

1. Connect your repository to Netlify
2. Set environment variables:
   - `GITHUB_TOKEN` (if using private repo)
3. Build command: `npm run build`
4. Publish directory: `dist`

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D graphics
- **React Three Fiber** - React Three.js integration
- **Fuse.js** - Fuzzy search
- **React Markdown** - Markdown rendering
- **Gray Matter** - Frontmatter parsing

## License

MIT License - see LICENSE file for details.