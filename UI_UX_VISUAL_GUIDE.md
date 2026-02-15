# UI/UX Improvements - Visual Guide

## Component Showcase

### 1. Mobile Navigation Drawer

```
┌─────────────────────────────────┐
│  ☰  ML Lab          ✕          │  ← Header with close button
├─────────────────────────────────┤
│                                 │
│  🏠  Home                       │  ← Touch-friendly cards
│      Algorithm Gallery          │     (min 44x44px)
│                                 │
│  📊  Data Lab                   │  ← Icons + descriptions
│      Dataset Explorer           │
│                                 │
│  🔍  EDA                        │  ← Staggered animations
│      Exploratory Analysis       │     (50ms delay each)
│                                 │
│  ⚙️  Preprocessing              │
│      Data Engineering           │
│                                 │
│  🎯  Feature Selection          │
│      Signal Optimization        │
│                                 │
│  👨‍🏫  Instructor                 │
│      Meet the Architect         │
│                                 │
├─────────────────────────────────┤
│  🤖 Attention Lab               │  ← CTA footer
│     Transformer Playground      │
└─────────────────────────────────┘
```

**Features:**
- Slide-in from right (500ms)
- Backdrop blur overlay
- Touch-friendly design
- Auto-close on navigation
- Smooth animations

---

### 2. Toast Notification System

```
Success Toast:
┌─────────────────────────────────┐
│  ✓  Changes saved successfully  ✕│
└─────────────────────────────────┘
   ↑ Emerald 500 background

Error Toast:
┌─────────────────────────────────┐
│  ✕  Failed to load data        ✕│
└─────────────────────────────────┘
   ↑ Rose 500 background

Warning Toast:
┌─────────────────────────────────┐
│  ⚠  Connection unstable        ✕│
└─────────────────────────────────┘
   ↑ Amber 500 background

Info Toast:
┌─────────────────────────────────┐
│  ℹ  New feature available      ✕│
└─────────────────────────────────┘
   ↑ Indigo 500 background
```

**Features:**
- Auto-dismiss (5s default)
- Slide-in from right
- Manual close button
- ARIA live regions
- Stack management

---

### 3. Skeleton Loader Variants

#### Algorithm Card Skeleton:
```
┌─────────────────────────────────┐
│  ▢▢▢▢  ▢▢▢▢▢▢                  │  ← Icon + badge
│                                 │
│  ▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢  │  ← Title
│  ▢▢▢▢▢▢▢▢▢▢▢▢                  │  ← Category
│                                 │
│  ─────────────────────────────  │  ← Divider
│                                 │
│  ▢▢▢▢▢▢▢▢▢▢                    │  ← Label
│  ▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢  │  ← Description
└─────────────────────────────────┘
```

#### Text Skeleton:
```
▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢
▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢
▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢
```

**Features:**
- Shimmer animation (2s)
- Multiple variants
- Customizable count
- Responsive sizing

---

### 4. Button Micro-interactions

#### Before Hover:
```
┌─────────────────────┐
│  Enter the Data Lab │
└─────────────────────┘
```

#### On Hover:
```
┌─────────────────────┐
│  Enter the Data Lab │  ← Lifts up 2px
└─────────────────────┘  ← Shadow increases
     ↑ Scale 1.02
```

#### On Click:
```
┌─────────────────────┐
│  Enter the Data Lab │  ← Ripple effect
└─────────────────────┘  ← Scale 0.98
     ↑ Active state
```

**Features:**
- Hover: scale(1.02) + shadow
- Active: scale(0.98)
- Ripple: white/30 overlay
- Smooth transitions (300ms)

---

### 5. Card Hover Effects

#### Resting State:
```
┌─────────────────────────────────┐
│  L  Linear Regression  Beginner │
│                                 │
│  Regression                     │
│                                 │
│  ─────────────────────────────  │
│                                 │
│  Core Derivation                │
│  Optimization & Gradients       │
└─────────────────────────────────┘
```

#### Hover State:
```
┌─────────────────────────────────┐
│  L  Linear Regression  Beginner │  ← Lifts up
│                                 │  ← Border: indigo
│  Regression                     │  ← Shadow: indigo
│                                 │
│  ─────────────────────────────  │
│                                 │
│  Core Derivation                │
│  Optimization & Gradients       │
│                                 │
│  ──  Deconstruct Module         │  ← Appears
└─────────────────────────────────┘
```

**Features:**
- Lift: translateY(-8px)
- Border: slate → indigo
- Shadow: slate → indigo
- Duration: 700ms
- Easing: cubic-bezier

---

### 6. Focus Indicators

#### Button Focus:
```
┌─────────────────────┐
│  Enter the Data Lab │
└─────────────────────┘
  ↑ 4px indigo ring
  ↑ 2px white offset
```

#### Link Focus:
```
Home  Data Lab  EDA
  ↑ 4px indigo ring
  ↑ Rounded corners
```

**Features:**
- 4px ring width
- Indigo 500 color
- 2px offset
- Rounded corners
- High visibility

---

### 7. Loading States

#### Page Loading:
```
┌─────────────────────────────────┐
│                                 │
│         ◐ Loading...            │  ← Spinner
│                                 │
│    Initializing Data Lab        │  ← Status text
│                                 │
└─────────────────────────────────┘
```

#### Content Loading:
```
┌─────────────────────────────────┐
│  ▢▢▢▢  ▢▢▢▢▢▢                  │  ← Skeleton
│  ▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢  │     with shimmer
│  ▢▢▢▢▢▢▢▢▢▢▢▢                  │
└─────────────────────────────────┘
```

**Features:**
- Branded spinner
- Status messages
- Skeleton screens
- Shimmer effects
- Smooth transitions

---

### 8. Animation Timing

```
Timeline (0ms → 1000ms):

0ms    ┌─ Component mounts
       │
100ms  ├─ Fade in starts
       │  opacity: 0 → 1
       │  translateY: 20px → 0
       │
300ms  ├─ Fade in complete
       │
       │  [User hovers]
       │
500ms  ├─ Hover animation
       │  scale: 1 → 1.02
       │  translateY: 0 → -2px
       │
800ms  ├─ Hover complete
       │
       │  [User clicks]
       │
900ms  ├─ Active state
       │  scale: 1.02 → 0.98
       │
1000ms └─ Ripple effect complete
```

**Easing Functions:**
- Entrance: cubic-bezier(0.16, 1, 0.3, 1)
- Hover: ease-out
- Active: ease-in-out
- Exit: ease-in

---

### 9. Responsive Breakpoints

```
Mobile (< 640px):
┌─────────────┐
│   Content   │  ← Single column
│   Stacked   │  ← Full width
└─────────────┘

Tablet (640px - 1024px):
┌──────────┬──────────┐
│ Content  │ Content  │  ← 2 columns
│          │          │  ← Flexible
└──────────┴──────────┘

Desktop (> 1024px):
┌─────┬─────┬─────┬─────┐
│  C  │  C  │  C  │  C  │  ← 4 columns
│     │     │     │     │  ← Grid layout
└─────┴─────┴─────┴─────┘
```

**Breakpoints:**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

---

### 10. Color System

```
Primary Colors:
┌────┬────┬────┬────┬────┐
│ 50 │100 │300 │600 │900 │  Indigo
└────┴────┴────┴────┴────┘

Semantic Colors:
┌────────┬────────┬────────┬────────┐
│Success │ Error  │Warning │  Info  │
│Emerald │  Rose  │ Amber  │ Indigo │
└────────┴────────┴────────┴────────┘

Neutral Colors:
┌────┬────┬────┬────┬────┐
│ 50 │100 │300 │600 │900 │  Slate
└────┴────┴────┴────┴────┘
```

**Usage:**
- Primary: Indigo 600
- Hover: Indigo 700
- Success: Emerald 500
- Error: Rose 500
- Warning: Amber 500
- Info: Indigo 500

---

### 11. Typography Scale

```
Display:
████████████████  96px / 88px / 72px

Heading:
██████████  60px / 48px / 36px / 30px / 24px

Body:
████  18px / 16px / 14px

Caption:
██  12px / 10px
```

**Font Weights:**
- Light: 300
- Regular: 400
- Medium: 500
- Bold: 700
- Black: 900

---

### 12. Spacing System

```
xs:   ▪ 4px
sm:   ▪▪ 8px
md:   ▪▪▪▪ 16px
lg:   ▪▪▪▪▪▪ 24px
xl:   ▪▪▪▪▪▪▪▪ 32px
2xl:  ▪▪▪▪▪▪▪▪▪▪▪▪ 48px
3xl:  ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ 64px
4xl:  ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ 96px
```

**Usage:**
- Padding: md (16px)
- Margin: lg (24px)
- Gap: md (16px)
- Section: 4xl (96px)

---

### 13. Shadow System

```
sm:   ▁ Subtle
md:   ▂ Default
lg:   ▃ Elevated
xl:   ▄ Prominent
2xl:  ▅ Dramatic
```

**Colors:**
- Default: slate-200
- Hover: indigo-100
- Active: indigo-200

---

### 14. Border Radius

```
sm:   ⌜⌝ 8px
md:   ⌜⌝ 16px
lg:   ⌜⌝ 24px
xl:   ⌜⌝ 32px
2xl:  ⌜⌝ 48px
full: ⭕ 9999px
```

**Usage:**
- Buttons: 16px
- Cards: 48px
- Inputs: 12px
- Badges: 9999px

---

## Accessibility Features

### Keyboard Navigation:
```
Tab Order:
1. Skip to content
2. Logo
3. Navigation links
4. Main content
5. Footer links

Focus Indicators:
┌─────────────────────┐
│  Focused Element    │  ← 4px indigo ring
└─────────────────────┘  ← 2px white offset
```

### Screen Reader:
```
<nav aria-label="Mobile navigation">
  <button aria-label="Close navigation">
  <a href="/" aria-label="Learn about Linear Regression">
  <div role="alert" aria-live="polite">
```

### Reduced Motion:
```
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Optimizations

### Bundle Splitting:
```
Main Bundle:     79.1 KB
Page Bundles:    6-14 KB each
CSS:             11.5 KB
Total First Load: 90.6 KB
```

### Lazy Loading:
```
import dynamic from 'next/dynamic';

const MobileNav = dynamic(() => import('./MobileNav'), {
  ssr: false
});
```

### GPU Acceleration:
```
.hover-lift {
  transform: translateY(-2px);  ← GPU
  opacity: 1;                   ← GPU
  /* Avoid: top, left, width, height */
}
```

---

## Usage Examples

### Toast Notification:
```typescript
import Toast from '@/components/Toast';

<Toast
  message="Changes saved successfully"
  type="success"
  duration={5000}
  onClose={() => setToast(null)}
/>
```

### Skeleton Loader:
```typescript
import SkeletonLoader from '@/components/SkeletonLoader';

<SkeletonLoader
  variant="algorithm-card"
  count={4}
  className="mb-8"
/>
```

### Mobile Navigation:
```typescript
import MobileNav from '@/components/MobileNav';

<MobileNav
  isOpen={mobileNavOpen}
  onClose={() => setMobileNavOpen(false)}
/>
```

---

## Best Practices

### Do's ✅:
- Use semantic HTML
- Add ARIA labels
- Implement keyboard navigation
- Provide focus indicators
- Use GPU-accelerated properties
- Test on real devices
- Respect user preferences
- Optimize bundle size

### Don'ts ❌:
- Don't use generic div/span
- Don't skip ARIA labels
- Don't forget keyboard users
- Don't use default focus styles
- Don't animate layout properties
- Don't test only on desktop
- Don't ignore accessibility
- Don't bloat the bundle

---

**Visual Guide Version**: 1.0
**Last Updated**: February 15, 2026
**Status**: Complete
