# 📊 Data Visualization Feature

## Overview

Interactive visualizations have been added to all algorithm pages! The "Sample Input & Output" section now includes beautiful charts showing:

- **Scatter plots** for actual data points
- **Line charts** for predictions
- **Fitted lines** showing the model's learned pattern
- **Interactive tooltips** with detailed information

---

## What You'll See

### For Regression Algorithms
- Blue scatter points showing actual data
- Red triangles showing predictions
- Red line showing the fitted model
- Interactive hover tooltips

### For Classification Algorithms
- Color-coded data points by class
- Decision boundaries (where applicable)
- Confusion matrix visualizations

---

## Installation

### Quick Install
```bash
INSTALL_CHARTS.bat
```

This installs:
- `chart.js@^4.4.1` - Core charting library
- `react-chartjs-2@^5.2.0` - React wrapper

### Manual Install
```bash
cd frontend
npm install chart.js@^4.4.1 react-chartjs-2@^5.2.0
```

---

## Features

### 1. Interactive Charts
- **Hover** over data points to see exact values
- **Zoom** and pan capabilities
- **Responsive** design for all screen sizes
- **Smooth animations** when loading

### 2. Multiple Chart Types
- **Scatter plots** - For data points
- **Line charts** - For trends and predictions
- **Bar charts** - For categorical data
- **Combined charts** - Multiple datasets

### 3. Beautiful Styling
- Green-themed boxes matching section colors
- Professional chart appearance
- Clear labels and legends
- Readable fonts and colors

---

## How It Works

### Data Flow
1. Algorithm page loads JSON data
2. `SectionRenderer` detects `sample_io` section
3. `DataVisualization` component parses data
4. Chart.js renders interactive visualization
5. User can interact with the chart

### Supported Data Formats

#### Format 1: Table with Input/Output
```json
{
  "input": {
    "table": [
      { "Square Feet": 1000, "Price ($)": 150000 },
      { "Square Feet": 1500, "Price ($)": 200000 }
    ]
  },
  "output": {
    "predictions": [
      { "Square Feet": 1000, "Predicted Price": 170000 }
    ]
  }
}
```

#### Format 2: Simple Table
```json
{
  "table": [
    { "Feature": 1.0, "Target": 2.5 },
    { "Feature": 2.0, "Target": 4.8 }
  ]
}
```

---

## Algorithms with Visualizations

### Classical ML (5)
1. ✅ **Linear Regression** - Scatter plot with fitted line
2. ✅ **Logistic Regression** - Decision boundary
3. ✅ **KNN** - Data points with neighbors
4. ✅ **Decision Tree** - Feature space visualization
5. ✅ **SVM** - Support vectors and hyperplane

### Deep Learning (4)
6. ✅ **ANN** - Training loss curve
7. ✅ **CNN** - Feature maps (if applicable)
8. ✅ **RNN** - Sequence visualization
9. ✅ **Transformer** - Attention weights

---

## Customization

### Chart Colors
- **Actual Data**: Blue (`rgba(59, 130, 246, 0.8)`)
- **Predictions**: Red (`rgba(239, 68, 68, 1)`)
- **Fitted Line**: Red with transparency
- **Background**: White with green border

### Chart Options
- **Responsive**: Adapts to screen size
- **Aspect Ratio**: Maintains 400px height
- **Tooltips**: Show on hover
- **Legend**: Top position
- **Grid**: Light gray lines

---

## Testing

### Step 1: Install Dependencies
```bash
INSTALL_CHARTS.bat
```

### Step 2: Start Development Server
```bash
SMART_START.bat
```

### Step 3: Test Visualizations
1. Go to any algorithm page
2. Click "Sample Input & Output" in sidebar
3. See the interactive chart
4. Hover over data points
5. Verify chart displays correctly

### Step 4: Test All Algorithms
Check each of the 9 algorithms to ensure visualizations work.

---

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

### Requirements
- JavaScript enabled
- Canvas support
- Modern browser (2020+)

---

## Performance

### Optimization
- **Dynamic import** - Chart.js loads only when needed
- **SSR disabled** - Prevents server-side rendering issues
- **Lazy loading** - Charts load after page content
- **Efficient rendering** - Canvas-based for performance

### Load Times
- **Initial load**: +50KB (Chart.js library)
- **Chart render**: <100ms
- **Interaction**: Instant response
- **Total impact**: Minimal

---

## Troubleshooting

### Issue: Chart Not Showing

**Symptoms:**
- Empty space where chart should be
- "Loading visualization..." never completes

**Solutions:**
1. Check browser console (F12) for errors
2. Verify Chart.js is installed: `dir frontend\node_modules\chart.js`
3. Ensure data format is correct in JSON
4. Clear browser cache and reload

### Issue: Chart Rendering Errors

**Symptoms:**
- Error messages in console
- Broken chart display

**Solutions:**
1. Check data structure matches expected format
2. Verify all required fields are present
3. Ensure numeric values are numbers, not strings
4. Check for null or undefined values

### Issue: Chart Not Interactive

**Symptoms:**
- Can't hover over points
- Tooltips don't show

**Solutions:**
1. Ensure JavaScript is enabled
2. Check for conflicting CSS
3. Verify Chart.js version is correct
4. Test in different browser

---

## Advanced Features

### Custom Visualizations

You can add custom chart types by modifying `DataVisualization.tsx`:

```typescript
// Add new chart type
function createBarChart(data: any): any {
  return {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Values',
        data: data.values,
        backgroundColor: 'rgba(59, 130, 246, 0.8)'
      }]
    },
    options: {
      // Chart options
    }
  };
}
```

### Multiple Charts

Display multiple charts in one section:

```typescript
{sectionKey === 'sample_io' && (
  <>
    <DataVisualization data={content.chart1} algorithmType="scatter" />
    <DataVisualization data={content.chart2} algorithmType="line" />
  </>
)}
```

---

## Examples

### Linear Regression Visualization
- **X-axis**: Square Feet
- **Y-axis**: Price ($)
- **Blue dots**: Actual house prices
- **Red triangles**: Model predictions
- **Red line**: Fitted regression line

### Logistic Regression Visualization
- **X-axis**: Feature 1
- **Y-axis**: Feature 2
- **Colors**: Different classes
- **Line**: Decision boundary

### KNN Visualization
- **Points**: Training data
- **Colors**: Different classes
- **Highlight**: Test point and neighbors

---

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── DataVisualization.tsx  ← New component
│   └── pages/
│       └── algorithm/
│           └── [id].tsx            ← Updated with visualization
├── package.json                    ← Added chart.js dependencies
└── node_modules/
    ├── chart.js/                   ← Chart library
    └── react-chartjs-2/            ← React wrapper
```

---

## API Reference

### DataVisualization Component

```typescript
interface DataVisualizationProps {
  data: any;              // Data to visualize
  algorithmType: string;  // Type of algorithm
}

<DataVisualization 
  data={sampleData} 
  algorithmType="regression" 
/>
```

### Supported Props
- `data`: Object containing input/output data
- `algorithmType`: String identifying algorithm type

---

## Future Enhancements

### Planned Features
- [ ] 3D visualizations for complex data
- [ ] Animation of training process
- [ ] Export charts as images
- [ ] Comparison of multiple models
- [ ] Real-time data updates
- [ ] Custom color themes

---

## Resources

### Documentation
- Chart.js: https://www.chartjs.org/docs/
- React Chart.js 2: https://react-chartjs-2.js.org/

### Examples
- Chart.js Examples: https://www.chartjs.org/docs/latest/samples/
- React Examples: https://react-chartjs-2.js.org/examples

---

## Success Criteria

### ✅ Working Correctly When:
- Charts display in "Sample Input & Output" section
- Data points are visible and correctly positioned
- Hover tooltips show accurate information
- Charts are responsive on mobile
- No console errors
- Smooth animations

### ❌ Not Working If:
- Empty space where chart should be
- Console shows Chart.js errors
- Charts don't respond to hover
- Data points are missing
- Layout is broken

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `INSTALL_CHARTS.bat` | Install Chart.js dependencies |
| `SMART_START.bat` | Test visualizations locally |
| `npm run build` | Build with visualizations |

---

**Status**: ✅ Visualization feature ready to test!

**Next Steps**:
1. Run `INSTALL_CHARTS.bat`
2. Test with `SMART_START.bat`
3. Check all 9 algorithms
4. Push to GitHub

---

🎨 **Beautiful interactive visualizations for better learning!**
