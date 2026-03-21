# OBASSTEEL PROJECT LIMITED - Website Setup Guide

## Overview

This is a complete, production-ready corporate website for OBASSTEEL PROJECT LIMITED, an oil & gas engineering company. The site features advanced animations, Supabase database integration, and a fully functional admin panel for content management.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **UI Components**: Custom + shadcn/ui

## Getting Started

### 1. Install Dependencies

The required packages have been added to `package.json`:
- `@supabase/supabase-js` - Supabase client
- `framer-motion` - Advanced animations

Run:
```bash
pnpm install
```

### 2. Environment Variables

Supabase integration has been set up automatically. The following env variables should be available:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `POSTGRES_URL`

These are automatically set up by the Supabase integration.

### 3. Initialize Database

The database schema has been created with 5 tables:
- `settings` - Company information
- `projects` - Project portfolio
- `services` - Service offerings
- `testimonials` - Client testimonials
- `team_members` - Team profiles

To initialize, run the setup script:
```bash
pnpm run dev
# Then navigate to /admin and start adding content
```

## Project Structure

```
app/
├── page.tsx                 # Home page
├── about/page.tsx          # About page with timeline & team
├── services/page.tsx       # Services page
├── projects/
│   ├── page.tsx           # Projects grid
│   └── [slug]/page.tsx    # Project detail page
├── contact/page.tsx        # Contact form & info
├── admin/                  # Admin dashboard
│   ├── page.tsx           # Dashboard overview
│   ├── projects/new/page.tsx
│   ├── services/new/page.tsx
│   ├── testimonials/new/page.tsx
│   ├── team/new/page.tsx
│   └── settings/page.tsx   # Company settings
└── api/
    ├── projects/route.ts
    ├── projects/[id]/route.ts
    ├── services/route.ts
    ├── testimonials/route.ts
    ├── team/route.ts
    └── settings/route.ts

components/
├── navigation.tsx          # Main navigation
├── footer.tsx             # Footer
├── hero.tsx               # Hero section with animations
├── floating-particles.tsx # Canvas-based particle effects
├── service-card.tsx       # Service card component
├── project-card.tsx       # Project card component
├── testimonial-card.tsx   # Testimonial card
├── services-section.tsx   # Services preview section
├── projects-section.tsx   # Projects preview section
└── testimonials-section.tsx # Testimonials section

lib/
├── types.ts               # TypeScript interfaces
├── supabase-client.ts     # Client-side Supabase
└── supabase-server.ts     # Server-side Supabase
```

## Features

### Public Pages

1. **Home** (`/`)
   - Animated hero section with particle effects
   - Services preview (6 services)
   - Featured projects grid
   - Client testimonials carousel
   - CTA sections

2. **About** (`/about`)
   - Company profile
   - Mission & Vision
   - Core values
   - Company timeline
   - Team member profiles

3. **Services** (`/services`)
   - All services with detailed descriptions
   - Service cards with hover effects
   - CTA section

4. **Projects** (`/projects`)
   - Project portfolio grid
   - Project detail pages with problem/solution/result

5. **Contact** (`/contact`)
   - Contact form with validation
   - Contact information (email, phone, address)
   - Business hours
   - Map placeholder

### Admin Panel

**Access**: `/admin` (No authentication required)

**Features**:
- Dashboard overview
- Create/manage projects
- Create/manage services
- Create/manage testimonials
- Create/manage team members
- Edit company settings (mission, vision, values, contact info)

### Admin Forms

- **Projects**: Title, location, description, image URL, category, problem/solution/result
- **Services**: Title, description, icon URL, display order
- **Testimonials**: Client name, company, feedback, image, rating
- **Team**: Name, title, role, bio, image
- **Settings**: Company info, contact details, mission, vision, core values

## Color Scheme

- **Primary**: #273c75 (Deep Blue)
- **Accent**: #f9ca24 (Golden Yellow)
- **Background**: #0a0e27 (Very Dark Blue)
- **Card**: #111829 (Dark Navy)
- **Foreground**: #f5f5f5 (Light Gray)

## Animation Features

1. **Framer Motion**
   - Page transitions
   - Scroll-triggered animations
   - Hover effects with glow borders
   - Staggered component animations

2. **Canvas Particles**
   - Floating particle effect in hero
   - Auto-responsive
   - Golden/accent colored particles

3. **Interactive Elements**
   - Smooth navigation with active indicators
   - Card hover animations (no shadows, glow borders)
   - CTA button animations
   - Scroll indicators

## Database Schema

### settings table
```sql
- id (PRIMARY KEY)
- company_name
- address
- email_1, email_2
- phone
- mission
- vision
- values (JSON array)
- created_at, updated_at
```

### projects table
```sql
- id (UUID PRIMARY KEY)
- title, location, description
- image_url
- category
- problem, solution, result
- slug (UNIQUE)
- created_at, updated_at
```

### services table
```sql
- id (UUID PRIMARY KEY)
- title, description
- icon_url
- order
- created_at, updated_at
```

### testimonials table
```sql
- id (UUID PRIMARY KEY)
- client_name, company
- feedback
- image_url
- rating
- created_at, updated_at
```

### team_members table
```sql
- id (UUID PRIMARY KEY)
- name, title, role, bio
- image_url
- created_at, updated_at
```

## API Routes

All routes return JSON and support CRUD operations:

- `GET/POST /api/projects` - Get all or create project
- `GET/PUT/DELETE /api/projects/[id]` - Project detail operations
- `GET/POST /api/services` - Services CRUD
- `GET/POST /api/testimonials` - Testimonials CRUD
- `GET/POST /api/team` - Team members CRUD
- `GET/PUT /api/settings` - Settings management

## Getting Started with Content

1. **Visit Admin Dashboard**: Navigate to `/admin`
2. **Add Company Settings**: Click "Edit Company Settings" to update mission, vision, values
3. **Add Services**: Create 6-10 key services via `/admin/services/new`
4. **Add Projects**: Add 3-6 completed projects via `/admin/projects/new`
5. **Add Testimonials**: Add client feedback via `/admin/testimonials/new`
6. **Add Team**: Add team members via `/admin/team/new`

## Deployment

### Vercel

1. Connect your GitHub repository
2. Environment variables are automatically configured
3. Deploy with one click

### Manual Deployment

1. Build: `pnpm run build`
2. Start: `pnpm run start`

## Customization

### Change Colors

Edit `/app/globals.css` - Update the CSS variables:
```css
--primary: #273c75;
--accent: #f9ca24;
```

### Modify Content Sections

- Home page sections are in `/app/page.tsx`
- Component files in `/components` are highly modular

### Add More Pages

Create new route folders in `/app` following Next.js App Router patterns.

## Troubleshooting

### Database Connection Issues
- Verify Supabase environment variables are set
- Check Supabase project status in dashboard

### Images Not Loading
- Ensure image URLs are valid HTTP/HTTPS URLs
- Check browser console for CORS errors

### Admin Panel Not Showing Data
- Verify database tables exist
- Check browser console for API errors
- Clear browser cache

## Support & Maintenance

The website is fully self-contained and requires only:
- Regular content updates via admin panel
- Monitoring of form submissions (contact form)
- Periodic backups of Supabase database

## Next Steps

1. Install dependencies: `pnpm install`
2. Start dev server: `pnpm run dev`
3. Visit `http://localhost:3000` to preview
4. Visit `/admin` to start adding content
5. Deploy to Vercel

Enjoy your new corporate website!
