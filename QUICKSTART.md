# OBASSTEEL - Quick Start Guide

## In 5 Minutes

### 1. Start Development Server
```bash
pnpm install
pnpm run dev
```

Open `http://localhost:3000`

### 2. Access Admin Panel
Go to `http://localhost:3000/admin`

- No password required
- Completely open access

### 3. Add Your First Content

**Add a Service**:
- Click "New Service" button
- Fill in title, description
- Click Create

**Add a Project**:
- Click "New Project" button
- Fill in title, location, description
- Add image URL (optional)
- Click Create

**Update Company Info**:
- Click "Edit Company Settings"
- Update mission, vision, contact details
- Save

### 4. See Changes Live

Changes appear instantly on:
- Home page
- Services page
- Projects page
- About page

## Navigation Map

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page with overview |
| About | `/about` | Company info, team, timeline |
| Services | `/services` | All service details |
| Projects | `/projects` | Project portfolio |
| Project Detail | `/projects/[slug]` | Individual project |
| Contact | `/contact` | Contact form & info |
| Admin | `/admin` | Content management |

## Admin Tasks

### Dashboard Features

1. **Projects** - Add/edit/delete projects
   - Image URLs required for thumbnails
   - Auto-generates URL slug

2. **Services** - Add company services
   - Up to 6 shown on home page
   - Ordered by "order" field

3. **Testimonials** - Add client reviews
   - Appears on home page carousel
   - 5-star rating system

4. **Team** - Add team members
   - Shows on About page
   - Include bios and photos

5. **Settings** - Company information
   - Mission & Vision statements
   - Contact emails & phone
   - Core values list

## Color Scheme Reference

Used throughout the site for consistency:

- **Primary (Blue)**: #273c75 - Main color for buttons, accents
- **Accent (Yellow)**: #f9ca24 - Highlights, CTA buttons
- **Dark Background**: #0a0e27 - Page background
- **Text**: #f5f5f5 - Light text on dark

## Key Features Explained

### Home Page Sections

1. **Hero** - Animated introduction with particle effects
2. **Services** - 6 latest services with glow hover
3. **Projects** - 6 featured projects grid
4. **Testimonials** - Scrollable client feedback
5. **CTA** - Call-to-action section

### Navigation

- Fixed header with logo and nav links
- Active page indicator (underline)
- Mobile-responsive design
- Quick "Get Started" button

### Animations

- Smooth page transitions
- Card hover effects (glow border, slight lift)
- Particle floating effect
- Scroll-triggered animations

## Customization Quick Tips

### Change Company Name
1. Go to `/admin/settings`
2. Update "Company Name"
3. Automatically updates everywhere

### Update Contact Info
1. `/admin/settings`
2. Change emails and phone
3. Also shows on Contact page

### Modify Hero Text
Edit `/app/page.tsx` - Search for "Transform Your Energy"

### Change Colors
Edit `/app/globals.css` - Look for `--primary` and `--accent`

### Add New Page
1. Create folder in `/app/` (e.g., `/app/pricing`)
2. Create `page.tsx` file
3. Add to Navigation component
4. Add routes to `/app/layout.tsx`

## Database Tables Overview

All data stored in Supabase PostgreSQL:

| Table | Purpose | Records |
|-------|---------|---------|
| settings | Company info | 1 record |
| projects | Project portfolio | Many |
| services | Service offerings | Many |
| testimonials | Client reviews | Many |
| team_members | Team profiles | Many |

API routes in `/app/api/` handle all CRUD operations.

## Testing Locally

1. Home page: http://localhost:3000
2. About: http://localhost:3000/about
3. Services: http://localhost:3000/services
4. Projects: http://localhost:3000/projects
5. Contact: http://localhost:3000/contact
6. Admin: http://localhost:3000/admin

Add content via admin and refresh pages to see changes.

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Vercel auto-configures Supabase env vars
4. Deploy - done!

## Common Tasks

### Delete a Project
❌ Not yet implemented - can be added in admin

### Edit Existing Content
- Admin panel shows basic overview only
- Full edit features can be added

### Upload Images
- Use image hosting service (Imgur, Cloudinary, etc)
- Paste URL into admin forms
- Or set up Supabase Storage

### Add Authentication
- Currently open access admin
- Can add password protection if needed

### Track Contact Form Submissions
- Form works locally (logs to console)
- Add email/database integration for production

## File Structure (Key Files)

```
- /app/page.tsx              ← Home page content
- /app/admin/                ← Admin dashboard
- /components/hero.tsx       ← Hero animations
- /lib/supabase-server.ts   ← Database connection
- /app/globals.css          ← Color scheme
```

## Performance Notes

- ✅ Optimized animations (Framer Motion)
- ✅ Image optimization (Next.js Image)
- ✅ Efficient database queries
- ✅ Fast page transitions
- ✅ Mobile responsive

## Support

For issues:
1. Check browser console for errors
2. Verify Supabase connection
3. Check environment variables
4. Review SETUP.md for detailed info

Happy building! 🚀
