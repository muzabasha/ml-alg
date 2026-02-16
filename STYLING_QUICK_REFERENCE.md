# Styling Quick Reference Guide

## Quick Start

### 1. Import Typography Components
```tsx
import {
    PageTitle, SectionTitle, SubsectionTitle, CardTitle,
    MicroTitle, BodyLarge, BodyMedium, Quote,
    MathTerm, MathVariable, Badge, EquationContainer,
    LoadingState, ErrorState, HeroSection, AccentText
} from '../components/Typography';
```

### 2. Import Chart Config
```tsx
import {
    scatterChartOptions, lineChartOptions, barChartOptions,
    doughnutChartOptions, chartColors
} from '../config/chartConfig';
```

## Common Patterns

### Hero Section
```tsx
<HeroSection
    badge="Module Name"
    title={<>Main Title <AccentText italic>Accent Part</AccentText></>}
    description="Description text here"
/>
```

### Section with Title and Body
```tsx
<SectionTitle>
    Section Name <AccentText>Highlighted Part</AccentText>
</SectionTitle>
<BodyLarge>
    Main description text with <MathTerm>mathematical terms</MathTerm> 
    and <MathVariable>X</MathVariable> variables.
</BodyLarge>
```

### Equation Display
```tsx
<EquationContainer>
    <BlockMath math="y = mx + b" />
</EquationContainer>

{/* Dark background version */}
<EquationContainer dark>
    <BlockMath math="y = mx + b" />
</EquationContainer>
```

### Multi-line Equations
```tsx
<EquationContainer>
    <BlockMath math="\begin{aligned}y = \\mx + b\end{aligned}" />
</EquationContainer>
```

### Badges
```tsx
<Badge variant="classification">Classification</Badge>
<Badge variant="regression">Regression</Badge>
<Badge variant="clustering">Clustering</Badge>
<Badge variant="timeseries">Time Series</Badge>
<Badge variant="image">Image</Badge>
```

### Charts
```tsx
{/* Scatter Plot */}
<Scatter
    data={{
        datasets: [{
            label: 'Data Points',
            data: points,
            backgroundColor: chartColors.primary.main,
            borderColor: chartColors.primary.border,
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 12,
        }]
    }}
    options={scatterChartOptions}
/>

{/* Line Chart */}
<Line
    data={{
        labels: ['A', 'B', 'C'],
        datasets: [{
            label: 'Trend',
            data: [1, 2, 3],
            borderColor: chartColors.secondary.border,
            backgroundColor: chartColors.secondary.lighter,
            borderWidth: 3,
            tension: 0.4,
        }]
    }}
    options={lineChartOptions}
/>

{/* Bar Chart */}
<Bar
    data={{
        labels: ['A', 'B', 'C'],
        datasets: [{
            label: 'Values',
            data: [10, 20, 30],
            backgroundColor: chartColors.quaternary.main,
            borderRadius: 8,
        }]
    }}
    options={barChartOptions}
/>
```

### Loading States
```tsx
{/* Full page loading */}
<LoadingState message="Initializing Visualization Core" />

{/* Chart loading (use in dynamic import) */}
const Chart = dynamic(() => import('...'), {
    ssr: false,
    loading: () => (
        <div className="animate-pulse bg-slate-50 h-full rounded-2xl flex items-center justify-center border border-slate-100">
            <div className="text-center space-y-3">
                <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Loading Chart</p>
            </div>
        </div>
    )
});
```

### Error States
```tsx
<ErrorState 
    title="Visualization Error" 
    message="Unable to render chart"
    icon="⚠️"
/>
```

### Tabs
```tsx
<TabContainer>
    <TabButton
        active={activeTab === 'tab1'}
        onClick={() => setActiveTab('tab1')}
        icon="🎯"
    >
        Tab 1
    </TabButton>
    <TabButton
        active={activeTab === 'tab2'}
        onClick={() => setActiveTab('tab2')}
        icon="📈"
    >
        Tab 2
    </TabButton>
</TabContainer>
```

### Stats Display
```tsx
<StatDisplay 
    value="150" 
    label="Observations" 
/>
```

### Cards
```tsx
<div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
    <CardTitle>Card Title</CardTitle>
    <BodyMedium>Card content here</BodyMedium>
</div>
```

## Typography Hierarchy

```tsx
<PageTitle>Page Title</PageTitle>                    {/* 6xl-8xl, font-black */}
<SectionTitle>Section Title</SectionTitle>           {/* 5xl, font-black */}
<SubsectionTitle>Subsection</SubsectionTitle>        {/* 3xl, font-black */}
<CardTitle>Card Title</CardTitle>                    {/* 2xl, font-black */}
<MicroTitle>MICRO TITLE</MicroTitle>                 {/* 10px, uppercase */}
<BodyLarge>Large body text</BodyLarge>               {/* xl, font-light */}
<BodyMedium>Medium body text</BodyMedium>            {/* base, font-medium */}
<BodySmall>Small body text</BodySmall>               {/* sm */}
<Quote>Quoted or italic text</Quote>                 {/* xl, italic */}
```

## Color Palette

### Chart Colors
```tsx
chartColors.primary      // Indigo (main data)
chartColors.secondary    // Emerald (predictions)
chartColors.tertiary     // Amber (highlights)
chartColors.quaternary   // Purple (alternative)
chartColors.danger       // Rose (errors)
chartColors.success      // Green (positive)
chartColors.slate        // Gray (neutral)
```

### Text Colors
```tsx
text-slate-900  // Primary text
text-slate-600  // Secondary text
text-slate-500  // Tertiary text
text-slate-400  // Light text
text-indigo-600 // Accent text
```

### Background Colors
```tsx
bg-white        // Primary background
bg-slate-50     // Secondary background
bg-slate-900    // Dark background
bg-slate-950    // Darker background
```

## Spacing

```tsx
// Container
className="container mx-auto px-6 py-20 max-w-7xl"

// Section gaps
className="space-y-12"      // Standard
className="space-y-20"      // Large

// Grid gaps
className="gap-8"           // Standard
className="gap-12"          // Large
className="gap-16"          // Extra large

// Card padding
className="p-8"             // Small
className="p-12"            // Medium
className="p-16"            // Large
```

## Border Radius

```tsx
className="rounded-2xl"         // Small (16px)
className="rounded-[2.5rem]"    // Medium (40px)
className="rounded-[3rem]"      // Large (48px)
className="rounded-[4rem]"      // Extra large (64px)
```

## Shadows

```tsx
className="shadow-sm"                                           // Small
className="shadow-xl"                                           // Medium
className="shadow-[0_64px_128px_-32px_rgba(2,6,23,0.05)]"     // Large
className="shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]"      // Extra large
```

## Mathematical Content

### Inline Math
```tsx
<p>
    The <MathTerm>gradient descent</MathTerm> algorithm minimizes 
    the loss function <MathVariable>L(θ)</MathVariable>.
</p>
```

### Display Math
```tsx
<EquationContainer>
    <BlockMath math="L(\theta) = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2" />
</EquationContainer>
```

### Multi-line Math
```tsx
<EquationContainer className="h-24">
    <BlockMath math="\begin{aligned}
        \text{Loss} = \\
        \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2
    \end{aligned}" />
</EquationContainer>
```

## Common Mistakes to Avoid

❌ **Don't** use arbitrary text sizes
```tsx
<h1 className="text-4xl">Title</h1>  // Wrong
```

✅ **Do** use Typography components
```tsx
<PageTitle>Title</PageTitle>  // Correct
```

❌ **Don't** use inline styles for colors
```tsx
<p style={{ color: '#6366f1' }}>Text</p>  // Wrong
```

✅ **Do** use Tailwind classes or components
```tsx
<AccentText color="indigo">Text</AccentText>  // Correct
```

❌ **Don't** create custom chart styling
```tsx
const options = { /* custom config */ }  // Wrong
```

✅ **Do** use centralized chart config
```tsx
import { scatterChartOptions } from '../config/chartConfig';  // Correct
```

❌ **Don't** use inconsistent spacing
```tsx
<div className="p-7 mb-13">  // Wrong
```

✅ **Do** use the spacing system
```tsx
<div className="p-8 mb-12">  // Correct
```

## Testing Checklist

- [ ] All text uses Typography components or constants
- [ ] All charts use centralized configuration
- [ ] All colors match the palette
- [ ] All spacing follows the system
- [ ] All border radii follow the system
- [ ] All shadows follow the system
- [ ] Mathematical terms are styled consistently
- [ ] Equations are in proper containers
- [ ] Loading states have messages
- [ ] Error states have helpful messages
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessible (contrast ratios, font sizes)

## Resources

- Full Documentation: `STYLING_STANDARDS.md`
- Typography Components: `frontend/src/components/Typography.tsx`
- Typography Constants: `frontend/src/styles/typography.ts`
- Chart Configuration: `frontend/src/config/chartConfig.ts`
- Visualization Improvements: `VISUALIZATION_IMPROVEMENTS.md`
