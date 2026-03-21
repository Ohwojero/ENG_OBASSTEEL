# OBASSTEEL Website - Visual Guide

## Color Palette Reference

### Primary Colors
- **Deep Blue** (#273c75) - Main color, buttons, text accents
- **Golden Yellow** (#f9ca24) - Highlights, CTAs, glow effects

### Neutral Colors
- **Very Dark Blue** (#0a0e27) - Page background
- **Dark Navy** (#111829) - Card backgrounds
- **Medium Blue-Gray** (#4a5573) - Muted text
- **Light Gray** (#f5f5f5) - Primary text

## Typography

### Fonts
- **Heading Font**: Geist Sans
- **Body Font**: Geist Sans
- **Mono Font**: Geist Mono

### Size Hierarchy
- **Page Title**: 48px - 96px (bold)
- **Section Heading**: 32px - 48px (bold)
- **Subsection**: 24px - 32px (bold)
- **Body**: 16px - 18px (regular)
- **Small Text**: 12px - 14px (regular)

## Page Layout Patterns

### Hero Sections
```
┌─────────────────────────────────────┐
│   [ANIMATED PARTICLES BACKGROUND]   │
├─────────────────────────────────────┤
│                                     │
│  [Large Gradient Heading]           │
│  [Subheading/Description]           │
│                                     │
│  [Button 1] [Button 2]              │
│                                     │
│  [Statistics Row]                   │
│                                     │
└─────────────────────────────────────┘
```

### Content Sections
```
┌─────────────────────────────────────┐
│                                     │
│  [Section Heading]                  │
│  [Subheading]                       │
│                                     │
│  [Card 1] [Card 2] [Card 3]         │
│  [Card 4] [Card 5] [Card 6]         │
│                                     │
│          [View All Button]          │
│                                     │
└─────────────────────────────────────┘
```

### Grid Layouts
```
Desktop (3 columns):
┌────────┬────────┬────────┐
│ Card 1 │ Card 2 │ Card 3 │
├────────┼────────┼────────┤
│ Card 4 │ Card 5 │ Card 6 │
└────────┴────────┴────────┘

Tablet (2 columns):
┌──────────┬──────────┐
│ Card 1   │ Card 2   │
├──────────┼──────────┤
│ Card 3   │ Card 4   │
├──────────┼──────────┤
│ Card 5   │ Card 6   │
└──────────┴──────────┘

Mobile (1 column):
┌─────────────────┐
│   Card 1        │
├─────────────────┤
│   Card 2        │
├─────────────────┤
│   Card 3        │
└─────────────────┘
```

## Component Styles

### Navigation Bar
```
┌─────────────────────────────────────┐
│ [O Logo] [Home] [About] [Services] │
│              [Contact] [Get Started]│
└─────────────────────────────────────┘
```
- Fixed at top
- Semi-transparent background
- Backdrop blur effect
- Active indicator underline (golden)

### Service Cards
```
┌───────────────────┐
│   [Icon/Emoji]    │
│   [Title]         │
│   [Description]   │
│   Learn more →    │
└───────────────────┘
```
- Rounded corners
- Border with glow on hover
- No shadows
- Scale animation on hover

### Project Cards
```
┌───────────────────┐
│  [Project Image]  │
│  Overlay on Hover:│
│  [Title]          │
│  [Location]       │
│  View Details →   │
│  [Category Badge] │
└───────────────────┘
```
- Image with overlay
- Category badge top-right
- Hover shows details
- Links to detail page

### Testimonial Cards
```
┌──────────────────────┐
│ ★★★★★               │
│                      │
│ "[Feedback text]"    │
│                      │
│ [Profile Pic]        │
│ Client Name          │
│ Company Name         │
└──────────────────────┘
```
- Star rating display
- Profile image
- Horizontal scroll on home

### Form Fields
```
┌──────────────────────┐
│ Label                │
├──────────────────────┤
│ [Input/Textarea]     │
│ (Dark background)    │
│ (Golden border hover) │
└──────────────────────┘
```
- Clear labels
- Dark background
- Accent color on focus
- Full width

### Buttons

#### Primary Button
```
┌──────────────────┐
│  Click Me!       │ (Golden background)
└──────────────────┘
```
- Background: #f9ca24 (Golden)
- Text: #273c75 (Blue)
- Hover: Shadow glow effect
- Scale animation on hover

#### Secondary Button
```
┌──────────────────┐
│  Click Me!       │ (Bordered)
└──────────────────┘
```
- Border: #f9ca24 (Golden)
- Text: #f9ca24 (Golden)
- Hover: Background tint
- Scale animation

## Animation Examples

### Page Transition
```
Old Page (Opacity: 100%) 
    ↓
Fade out (0.3s)
    ↓
New Page loads
    ↓
Fade in (0.3s)
    ↓
New Page (Opacity: 100%)
```

### Card Hover
```
Normal State:
- Opacity: 100%
- Scale: 100%
- Border: Gray

Hover State:
- Opacity: 100%
- Scale: 102%
- Border: Golden (Glow effect)
- Slight lift animation
```

### Scroll Animation
```
Element Out of View:
- Opacity: 0
- Y Position: +20px

Element Scrolled Into View:
- Opacity: 100% (animated)
- Y Position: 0px (animated)
- Duration: 0.5s-0.8s
```

### Particle Effect
```
Canvas Background:
- 50 floating particles
- Golden color
- Random movement
- Smooth animation
- Responsive to window size
```

## Responsive Breakpoints

### Mobile First
```
Mobile (< 768px):
- Single column layouts
- Simplified navigation
- Larger touch targets
- Stack all elements

Tablet (768px - 1024px):
- 2 column grids
- Expanded navigation
- Balanced spacing
- Optimized touch

Desktop (> 1024px):
- 3 column grids
- Full navigation
- Wide spacing
- Maximum content
```

## Empty States

### No Content Placeholders
```
┌─────────────────────┐
│                     │
│    [Icon/Emoji]     │
│                     │
│  "No items yet"     │
│  [Admin Link]       │
│                     │
└─────────────────────┘
```

## Footer Structure
```
┌──────────────────────────────────────────┐
│ [Company] | [Navigation] | [Services]    │
│ [Address] | [Links]      | [Links]       │
│ [Email]   | [Links]      | [CTA Button]  │
├──────────────────────────────────────────┤
│ © 2026 OBASSTEEL | [Privacy] [Terms]     │
└──────────────────────────────────────────┘
```

## Contact Section Layout
```
┌─────────────────────────────────────────┐
│                                         │
│  Contact Information    |   Contact Form│
│  ─────────────────     |   ─────────────│
│  📍 Address            |   Name Input   │
│  📞 Phone              |   Email Input  │
│  📧 Email              |   Message Box  │
│  ⏰ Hours              |   Submit Btn   │
│                        |                │
│  [Map Placeholder]     |                │
│                                         │
└─────────────────────────────────────────┘
```

## Admin Dashboard Layout
```
┌──────────┬──────────────────────────┐
│          │                          │
│ Sidebar  │    Main Content Area     │
│          │                          │
│ Dashboard│   [Dashboard Overview]   │
│ Projects │   - Stats Cards          │
│ Services │   - Quick Actions        │
│ Testi... │   - Recent Activity      │
│ Team     │                          │
│ Settings │                          │
│          │                          │
│[Back Btn]│                          │
│          │                          │
└──────────┴──────────────────────────┘
```

## Form Page Layout
```
┌──────────────────────────────┐
│ [Back to Dashboard]          │
│                              │
│ ┌────────────────────────┐   │
│ │  New [Item] Form       │   │
│ ├────────────────────────┤   │
│ │                        │   │
│ │ [Form Fields...]       │   │
│ │                        │   │
│ │ [Create] [Cancel]      │   │
│ │                        │   │
│ └────────────────────────┘   │
│                              │
└──────────────────────────────┘
```

## Glow Effects

### Border Glow (No Shadow)
```css
Normal:
border: 1px solid #1f2937

Hover:
border: 1px solid #f9ca24
box-shadow: 0 0 20px rgba(249, 202, 36, 0.3)
```

### Text Glow (Accent)
```css
color: #f9ca24
text-shadow: 0 0 10px rgba(249, 202, 36, 0.2)
```

## Spacing Scale

- Extra Small: 4px
- Small: 8px
- Medium: 16px
- Large: 24px
- Extra Large: 32px
- Huge: 48px

Used for padding, margins, and gaps between elements.

## Border Radius

- Small: 4px
- Medium: 8px
- Large: 12px (Default for cards: `--radius`)

## Shadows

**NO traditional shadows used**

Instead:
- Glow borders on hover
- Color overlays
- Opacity changes
- Scale transforms

## Theme Consistency

✅ **Colors**: Always use design tokens
✅ **Spacing**: Use spacing scale
✅ **Typography**: Stick to 2 fonts
✅ **Effects**: Glow borders, no shadows
✅ **Animations**: Smooth, under 500ms

---

This visual guide ensures consistent design across the entire OBASSTEEL website.

Use these patterns and styles when customizing or extending the site.
