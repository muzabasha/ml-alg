# ML Learning Platform - Styling Standards

## Overview
This document defines the consistent styling standards for text, graphs, plots, equations, and terms across the entire application.

## Typography System

### Hierarchy

1. **Page Titles** (Hero sections)
   - Size: `text-6xl md:text-8xl`
   - Weight: `font-black`
   - Tracking: `tracking-tighter`
   - Color: `text-slate-900`
   - Accent: `text-indigo-400 italic`
   - Usage: Main page headings in hero sections

2. **Section Titles**
   - Size: `text-5xl`
   - Weight: `font-black`
   - Tracking: `tracking-tighter`
   - Color: `text-slate-900`
   - Accent: `text-indigo-600`
   - Usage: Major section headings

3. **Subsection Titles**
   - Size: `text-3xl`
   - Weight: `font-black`
   - Tracking: `tracking-tight`
   - Color: `text-slate-900`
   - Usage: Subsection headings within sections

4. **Card Titles**
   - Size: `text-2xl` (regular) or `text-3xl` (large)
   - Weight: `font-black`
   - Tracking: `tracking-tight`
   - Color: `text-slate-900`
   - Usage: Titles within cards and panels

5. **Micro Titles** (Labels/Badges)
   - Size: `text-[10px]`
   - Weight: `font-black`
   - Tracking: `tracking-[0.3em]`
   - Transform: `uppercase`
   - Color: `text-slate-400` or `text-indigo-600`
   - Usage: Small labels, category badges, step indicators

### Body Text

1. **Large Body**
   - Size: `text-xl`
   - Weight: `font-light`
   - Color: `text-slate-500`
   - Line Height: `leading-relaxed`
   - Usage: Hero descriptions, important paragraphs

2. **Medium Body**
   - Size: `text-base`
   - Weight: `font-medium`
   - Color: `text-slate-600`
   - Line Height: `leading-relaxed`
   - Usage: Standard body text, descriptions

3. **Small Body**
   - Size: `text-sm`
   - Weight: `font-normal`
   - Color: `text-slate-600`
   - Line Height: `leading-relaxed`
   - Usage: Secondary information, captions

4. **Extra Small Body**
   - Size: `text-xs`
   - Weight: `font-normal`
   - Color: `text-slate-500`
   - Line Height: `leading-relaxed`
   - Usage: Fine print, metadata

### Special Text Styles

1. **Quotes/Italic Text**
   - Size: `text-xl` or `text-base`
   - Weight: `font-light`
   - Style: `italic`
   - Color: `text-slate-500`
   - Usage: Quotes, emphasized explanations

2. **Mathematical Terms**
   - Weight: `font-medium`
   - Color: `text-indigo-600`
   - Usage: Inline mathematical concepts (e.g., "gradient descent", "covariance")

3. **Mathematical Variables**
   - Font: `font-mono`
   - Color: `text-indigo-700`
   - Background: `bg-indigo-50`
   - Padding: `px-1.5 py-0.5`
   - Border Radius: `rounded`
   - Usage: Inline variables (e.g., `X`, `y`, `θ`)

4. **Inline Code**
   - Font: `font-mono`
   - Size: `text-sm`
   - Background: `bg-slate-100`
   - Color: `text-slate-700`
   - Padding: `px-2 py-1`
   - Border Radius: `rounded`
   - Usage: Code snippets, function names

## Color System

### Primary Colors
- **Indigo** (Primary): `#6366f1` - Main brand color, primary actions
- **Emerald** (Secondary): `#10b981` - Success, positive outcomes
- **Amber** (Tertiary): `#f59e0b` - Warnings, highlights
- **Purple** (Accent): `#8b5cf6` - Alternative accent
- **Rose** (Danger): `#ef4444` - Errors, warnings

### Text Colors
- **Primary Text**: `text-slate-900` (#0f172a)
- **Secondary Text**: `text-slate-600` (#475569)
- **Tertiary Text**: `text-slate-500` (#64748b)
- **Light Text**: `text-slate-400` (#94a3b8)
- **White Text**: `text-white` (#ffffff)

### Background Colors
- **Primary BG**: `bg-white` (#ffffff)
- **Secondary BG**: `bg-slate-50` (#f8fafc)
- **Dark BG**: `bg-slate-900` (#0f172a)
- **Darker BG**: `bg-slate-950` (#020617)

## Chart Styling

### Chart Text
All charts should use the Outfit font family with these specifications:

1. **Chart Titles**
   - Font: Outfit
   - Size: 20px
   - Weight: 900
   - Color: #0f172a (slate-900)
   - Padding: 10px top, 30px bottom

2. **Axis Labels**
   - Font: Outfit
   - Size: 12px
   - Weight: 900
   - Color: #64748b (slate-500)
   - Padding: 10px

3. **Legend**
   - Font: Outfit
   - Size: 11px
   - Weight: 700
   - Color: #0f172a (slate-900)
   - Point Style: circle
   - Box Size: 8x8px

4. **Tooltips**
   - Title Font: Outfit, 13px, weight 900
   - Body Font: Outfit, 12px, weight 500
   - Background: #0f172a
   - Border: #4f46e5 (indigo-600)
   - Border Radius: 12px
   - Padding: 16px

### Chart Colors
Use the centralized color palette from `chartConfig.ts`:
- Primary: `rgba(99, 102, 241, 0.8)` - Indigo
- Secondary: `rgba(16, 185, 129, 0.8)` - Emerald
- Tertiary: `rgba(245, 158, 11, 0.8)` - Amber
- Quaternary: `rgba(139, 92, 246, 0.8)` - Purple
- Danger: `rgba(239, 68, 68, 0.8)` - Rose

### Chart Elements
- **Point Radius**: 6-8px (default), 10-12px (hover)
- **Line Width**: 3-4px
- **Border Width**: 2-3px
- **Border Radius** (bars): 8px
- **Grid Lines**: `rgba(0, 0, 0, 0.03)`
- **Animation**: 800ms, easeInOutQuart

## Equation Styling

### Equation Containers

1. **Light Background**
   ```tsx
   <div className="py-12 bg-slate-50 rounded-[3rem] shadow-inner border border-slate-100 flex items-center justify-center">
       <BlockMath math="..." />
   </div>
   ```

2. **Dark Background**
   ```tsx
   <div className="py-12 bg-white/5 rounded-[3rem] shadow-inner border border-white/10 flex items-center justify-center">
       <BlockMath math="..." />
   </div>
   ```

### Equation Formatting
- Use `BlockMath` for display equations
- Use `InlineMath` for inline equations
- Break long equations into multiple lines using `\begin{aligned}...\end{aligned}`
- Adjust container height based on equation complexity:
  - Simple: `h-16`
  - Medium: `h-20` or `h-24`
  - Complex: `h-28` or `h-32`

## Badge/Tag Styling

### Task Type Badges
```tsx
<Badge variant="classification">Classification</Badge>
<Badge variant="regression">Regression</Badge>
<Badge variant="clustering">Clustering</Badge>
<Badge variant="timeseries">Time Series</Badge>
<Badge variant="image">Image</Badge>
```

Colors:
- Classification: `bg-emerald-50 text-emerald-600`
- Regression: `bg-amber-50 text-amber-600`
- Clustering: `bg-purple-50 text-purple-600`
- Time Series: `bg-blue-50 text-blue-600`
- Image: `bg-rose-50 text-rose-600`

## Loading States

### Standard Loading
```tsx
<LoadingState message="Initializing Visualization Core" />
```

Components:
- Spinner: 20x20px, indigo-600, 4px border
- Text: 10px, font-black, uppercase, tracking-[0.3em], indigo-400

### Chart Loading
```tsx
<div className="animate-pulse bg-slate-50 h-full rounded-2xl flex items-center justify-center border border-slate-100">
    <div className="text-center space-y-3">
        <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Loading Chart</p>
    </div>
</div>
```

## Error States

### Standard Error
```tsx
<ErrorState 
    title="Visualization Error" 
    message="Unable to render chart"
    icon="⚠️"
/>
```

Components:
- Container: `bg-rose-50 rounded-[3rem] border border-rose-100 p-12`
- Icon: 16x16px, white background, rounded-2xl
- Title: 10px, font-black, uppercase, rose-900
- Message: 14px, italic, rose-700

## Spacing System

### Container Padding
- Standard: `px-6 py-20`
- Large: `px-6 md:px-12 py-24`

### Section Gaps
- Standard: `space-y-12`
- Large: `space-y-20`

### Card Padding
- Small: `p-8`
- Medium: `p-12`
- Large: `p-16`

### Grid Gaps
- Standard: `gap-8`
- Large: `gap-12`
- Extra Large: `gap-16`

## Border Radius System

- Small: `rounded-2xl` (16px)
- Medium: `rounded-[2.5rem]` (40px)
- Large: `rounded-[3rem]` (48px)
- Extra Large: `rounded-[4rem]` (64px)

## Shadow System

- Small: `shadow-sm`
- Medium: `shadow-xl`
- Large: `shadow-[0_64px_128px_-32px_rgba(2,6,23,0.05)]`
- Extra Large: `shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]`

## Usage Guidelines

### When to Use Each Component

1. **Use `<PageTitle>`** for main page headings in hero sections
2. **Use `<SectionTitle>`** for major section divisions
3. **Use `<SubsectionTitle>`** for subsections within major sections
4. **Use `<CardTitle>`** for titles within cards and panels
5. **Use `<MicroTitle>`** for labels, badges, and small headings
6. **Use `<BodyLarge>`** for hero descriptions and important paragraphs
7. **Use `<BodyMedium>`** for standard body text
8. **Use `<Quote>`** for emphasized explanations and quotes
9. **Use `<MathTerm>`** for inline mathematical concepts
10. **Use `<MathVariable>`** for inline variables and symbols
11. **Use `<Badge>`** for task types and categories
12. **Use `<EquationContainer>`** for display equations
13. **Use `<LoadingState>`** for full-page loading
14. **Use `<ErrorState>`** for error displays

### Consistency Checklist

- [ ] All page titles use the same size and weight
- [ ] All section titles follow the hierarchy
- [ ] All mathematical terms are styled consistently
- [ ] All charts use the Outfit font family
- [ ] All charts use the centralized color palette
- [ ] All equations are in proper containers
- [ ] All badges use the correct variant colors
- [ ] All loading states have descriptive messages
- [ ] All error states have helpful messages
- [ ] All spacing follows the system
- [ ] All border radii follow the system
- [ ] All shadows follow the system

## Implementation

### Import Typography Components
```tsx
import {
    PageTitle,
    SectionTitle,
    SubsectionTitle,
    CardTitle,
    MicroTitle,
    BodyLarge,
    BodyMedium,
    Quote,
    MathTerm,
    MathVariable,
    Badge,
    EquationContainer,
    LoadingState,
    ErrorState,
} from '../components/Typography';
```

### Import Chart Configuration
```tsx
import {
    baseChartOptions,
    scatterChartOptions,
    lineChartOptions,
    barChartOptions,
    doughnutChartOptions,
    chartColors,
} from '../config/chartConfig';
```

### Import Typography Constants
```tsx
import { typography, colors, spacing, borders, shadows } from '../styles/typography';
```

## Examples

### Page Structure
```tsx
<Layout>
    <main className="container mx-auto px-6 py-20 max-w-7xl">
        <HeroSection
            badge="Data Engineering Module"
            title={<>Numeric Decontamination & <AccentText italic>Structural Scaling</AccentText></>}
            description="Models are only as good as the mathematical quality of their inputs."
        />
        
        <SectionTitle>
            Managing the <AccentText>Mathematical Void</AccentText>
        </SectionTitle>
        
        <BodyLarge>
            Data nulls (NaN) represent a break in the geometric manifold.
        </BodyLarge>
        
        <EquationContainer>
            <BlockMath math="X_{clean} = f(X_{raw})" />
        </EquationContainer>
    </main>
</Layout>
```

### Chart Implementation
```tsx
<Scatter
    data={{
        datasets: [{
            label: 'Data Points',
            data: points,
            backgroundColor: chartColors.primary.main,
            borderColor: chartColors.primary.border,
        }]
    }}
    options={scatterChartOptions}
/>
```

## Maintenance

When adding new pages or components:
1. Use the Typography components for all text
2. Use the chartConfig for all visualizations
3. Follow the color system consistently
4. Use the spacing system for layouts
5. Apply the border radius system
6. Use the shadow system for depth
7. Test on multiple screen sizes
8. Verify accessibility (contrast ratios)
9. Check loading and error states
10. Document any new patterns

## Resources

- Typography Components: `frontend/src/components/Typography.tsx`
- Typography Constants: `frontend/src/styles/typography.ts`
- Chart Configuration: `frontend/src/config/chartConfig.ts`
- Global Styles: `frontend/src/styles/globals.css`
