import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Layout from '../components/Layout';
import WorkflowNavButtons from '../components/WorkflowNavButtons';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Bar, Line, Scatter, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CodeBlock = dynamic(() => import('../components/CodeBlock'), {
    ssr: false,
    loading: () => <div className="h-40 bg-slate-900 rounded-[2rem] animate-pulse my-6"></div>
});

// Type definitions
interface Dataset {
    id: string;
    name: string;
    library: 'Scikit-Learn' | 'Seaborn' | 'Statsmodels' | 'Deep Learning';
    description: string;
    source: string;
    task: 'Classification' | 'Regression' | 'Clustering' | 'Time Series' | 'Image' | 'Text';
    samples: number | string;
    features: number | string;
    classes?: number | string;
    featureNames?: string[];
    targetNames?: string[];
    useCases: string[];
}

const DatasetsPage = () => {
    const [selectedDataset, setSelectedDataset] = useState('iris');
    const [filter, setFilter] = useState<'All' | 'Scikit-Learn' | 'Seaborn' | 'Statsmodels' | 'Deep Learning'>('All');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getImportCode = (datasetId: string) => {
        const codes: Record<string, string> = {
            iris: 'from sklearn.datasets import load_iris\nimport pandas as pd\nimport numpy as np\n\n# Load dataset\niris = load_iris()\nX = iris.data\ny = iris.target\n\n# Convert to DataFrame\ndf = pd.DataFrame(X, columns=iris.feature_names)\ndf[\'species\'] = iris.target_names[y]\n\nprint(df.head())\nprint(f"\\nShape: {df.shape}")',
            wine: 'from sklearn.datasets import load_wine\nimport pandas as pd\n\n# Load dataset\nwine = load_wine()\nX = wine.data\ny = wine.target\n\n# Convert to DataFrame\ndf = pd.DataFrame(X, columns=wine.feature_names)\ndf[\'cultivar\'] = wine.target_names[y]\n\nprint(df.describe())',
            california_housing: 'from sklearn.datasets import fetch_california_housing\nimport pandas as pd\n\n# Load dataset\nhousing = fetch_california_housing()\nX = housing.data\ny = housing.target\n\n# Convert to DataFrame\ndf = pd.DataFrame(X, columns=housing.feature_names)\ndf[\'MedHouseVal\'] = y\n\nprint(df.info())',
            breast_cancer: 'from sklearn.datasets import load_breast_cancer\nimport pandas as pd\n\n# Load dataset\ncancer = load_breast_cancer()\nX = cancer.data\ny = cancer.target\n\n# Convert to DataFrame\ndf = pd.DataFrame(X, columns=cancer.feature_names)\ndf[\'diagnosis\'] = cancer.target_names[y]\n\nprint(df.head())',
            diabetes: 'from sklearn.datasets import load_diabetes\nimport pandas as pd\n\n# Load dataset\ndiabetes = load_diabetes()\nX = diabetes.data\ny = diabetes.target\n\n# Convert to DataFrame\ndf = pd.DataFrame(X, columns=diabetes.feature_names)\ndf[\'progression\'] = y\n\nprint(df.describe())',
            titanic: 'import seaborn as sns\nimport pandas as pd\n\n# Load dataset\ndf = sns.load_dataset(\'titanic\')\n\nprint(df.head())\nprint(f"\\nShape: {df.shape}")\nprint(f"\\nSurvival Rate: {df[\'survived\'].mean():.2%}")',
            tips: 'import seaborn as sns\nimport pandas as pd\n\n# Load dataset\ndf = sns.load_dataset(\'tips\')\n\nprint(df.head())\nprint(f"\\nAverage Tip: ${df[\'tip\'].mean():.2f}")\nprint(f"\\nAverage Bill: ${df[\'total_bill\'].mean():.2f}")',
            penguins: 'import seaborn as sns\nimport pandas as pd\n\n# Load dataset\ndf = sns.load_dataset(\'penguins\')\n\n# Handle missing values\ndf = df.dropna()\n\nprint(df.head())\nprint(f"\\nSpecies Distribution:\\n{df[\'species\'].value_counts()}")',
            diamonds: 'import seaborn as sns\nimport pandas as pd\n\n# Load dataset\ndf = sns.load_dataset(\'diamonds\')\n\nprint(df.head())\nprint(f"\\nPrice Statistics:\\n{df[\'price\'].describe()}")',
            macrodata: 'import statsmodels.api as sm\nimport pandas as pd\n\n# Load dataset\ndata = sm.datasets.macrodata.load_pandas()\ndf = data.data\n\nprint(df.head())\nprint(f"\\nTime Range: {df[\'year\'].min()}Q{df[\'quarter\'].min()} to {df[\'year\'].max()}Q{df[\'quarter\'].max()}")',
            mnist: 'from tensorflow import keras\nimport numpy as np\n\n# Load dataset\n(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()\n\nprint(f"Training Set: {X_train.shape}")\nprint(f"Test Set: {X_test.shape}")\nprint(f"Pixel Range: [{X_train.min()}, {X_train.max()}]")\nprint(f"Classes: {np.unique(y_train)}")'
        };
        return codes[datasetId] || '# Import code not available';
    };

    // Helper function to generate chart data for visualizations
    const getChartData = (datasetId: string, vizType: string) => {
        const chartConfigs: Record<string, any> = {
            'iris_distribution': {
                type: 'bar',
                data: {
                    labels: ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'],
                    datasets: [
                        {
                            label: 'Setosa',
                            data: [5.0, 3.4, 1.5, 0.2],
                            backgroundColor: 'rgba(99, 102, 241, 0.7)',
                        },
                        {
                            label: 'Versicolor',
                            data: [5.9, 2.8, 4.3, 1.3],
                            backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        },
                        {
                            label: 'Virginica',
                            data: [6.5, 3.0, 5.6, 2.0],
                            backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: true, position: 'top' as const } }
                }
            },
            'iris_scatter': {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: 'Setosa',
                            data: Array.from({ length: 15 }, () => ({ x: Math.random() * 2 + 4, y: Math.random() * 1 + 0.1 })),
                            backgroundColor: 'rgba(99, 102, 241, 0.6)',
                        },
                        {
                            label: 'Versicolor',
                            data: Array.from({ length: 15 }, () => ({ x: Math.random() * 2 + 5, y: Math.random() * 1 + 1 })),
                            backgroundColor: 'rgba(16, 185, 129, 0.6)',
                        },
                        {
                            label: 'Virginica',
                            data: Array.from({ length: 15 }, () => ({ x: Math.random() * 2 + 6, y: Math.random() * 1 + 1.5 })),
                            backgroundColor: 'rgba(245, 158, 11, 0.6)',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { title: { display: true, text: 'Petal Length (cm)' } },
                        y: { title: { display: true, text: 'Petal Width (cm)' } }
                    }
                }
            },
            'wine_chemical': {
                type: 'bar',
                data: {
                    labels: ['Alcohol', 'Malic Acid', 'Ash', 'Alcalinity', 'Magnesium', 'Phenols'],
                    datasets: [
                        {
                            label: 'Cultivar 0',
                            data: [13.7, 2.0, 2.4, 17.0, 106, 2.8],
                            backgroundColor: 'rgba(139, 92, 246, 0.7)',
                        },
                        {
                            label: 'Cultivar 1',
                            data: [12.3, 1.9, 2.2, 20.0, 94, 2.3],
                            backgroundColor: 'rgba(236, 72, 153, 0.7)',
                        },
                        {
                            label: 'Cultivar 2',
                            data: [13.2, 3.3, 2.4, 21.0, 99, 1.7],
                            backgroundColor: 'rgba(34, 197, 94, 0.7)',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: true, position: 'top' as const } }
                }
            },
            'housing_price': {
                type: 'line',
                data: {
                    labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8'],
                    datasets: [{
                        label: 'Median Income (×$10k)',
                        data: [50, 120, 180, 250, 320, 380, 450, 500],
                        borderColor: 'rgb(99, 102, 241)',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { title: { display: true, text: 'Median Income Range' } },
                        y: { title: { display: true, text: 'House Value ($1000s)' } }
                    }
                }
            },
            'cancer_class': {
                type: 'doughnut',
                data: {
                    labels: ['Benign', 'Malignant'],
                    datasets: [{
                        data: [357, 212],
                        backgroundColor: ['rgba(16, 185, 129, 0.8)', 'rgba(239, 68, 68, 0.8)'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true, position: 'bottom' as const }
                    }
                }
            },
            'diabetes_bmi': {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'BMI vs Progression',
                        data: Array.from({ length: 50 }, () => ({
                            x: Math.random() * 0.2 + 0.02,
                            y: Math.random() * 300 + 50
                        })),
                        backgroundColor: 'rgba(99, 102, 241, 0.5)',
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { title: { display: true, text: 'BMI (normalized)' } },
                        y: { title: { display: true, text: 'Disease Progression' } }
                    }
                }
            },
            'titanic_survival': {
                type: 'bar',
                data: {
                    labels: ['1st Class', '2nd Class', '3rd Class'],
                    datasets: [
                        {
                            label: 'Survived',
                            data: [136, 87, 119],
                            backgroundColor: 'rgba(16, 185, 129, 0.8)',
                        },
                        {
                            label: 'Died',
                            data: [80, 97, 372],
                            backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: true, position: 'top' as const } }
                }
            },
            'tips_bill': {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Bill vs Tip',
                        data: Array.from({ length: 40 }, () => ({
                            x: Math.random() * 40 + 10,
                            y: Math.random() * 8 + 1
                        })),
                        backgroundColor: 'rgba(245, 158, 11, 0.6)',
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { title: { display: true, text: 'Total Bill ($)' } },
                        y: { title: { display: true, text: 'Tip ($)' } }
                    }
                }
            },
            'penguins_species': {
                type: 'bar',
                data: {
                    labels: ['Adelie', 'Gentoo', 'Chinstrap'],
                    datasets: [{
                        label: 'Count',
                        data: [152, 124, 68],
                        backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)'],
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            },
            'diamonds_price': {
                type: 'line',
                data: {
                    labels: ['0.3', '0.5', '0.7', '1.0', '1.5', '2.0', '2.5', '3.0'],
                    datasets: [{
                        label: 'Price ($)',
                        data: [800, 1500, 2500, 4500, 8000, 13000, 18000, 24000],
                        borderColor: 'rgb(139, 92, 246)',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { title: { display: true, text: 'Carat' } },
                        y: { title: { display: true, text: 'Price ($)' } }
                    }
                }
            },
            'macrodata_gdp': {
                type: 'line',
                data: {
                    labels: ['1960', '1970', '1980', '1990', '2000', '2009'],
                    datasets: [{
                        label: 'GDP Growth',
                        data: [2500, 4000, 6000, 8500, 12000, 14500],
                        borderColor: 'rgb(16, 185, 129)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { title: { display: true, text: 'Year' } },
                        y: { title: { display: true, text: 'GDP (Billions)' } }
                    }
                }
            },
            'mnist_digits': {
                type: 'bar',
                data: {
                    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    datasets: [{
                        label: 'Sample Count',
                        data: [5923, 6742, 5958, 6131, 5842, 5421, 5918, 6265, 5851, 5949],
                        backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            }
        };
        return chartConfigs[vizType] || null;
    };

    // Helper function to get EDA visualizations for each dataset
    const getEDAVisualizations = (datasetId: string) => {
        const visualizations: Record<string, any[]> = {
            'iris': [
                {
                    title: 'Feature Distribution',
                    icon: '📊',
                    chartType: 'iris_distribution',
                    insight: 'Setosa is clearly separable by petal dimensions. Petal length shows the most distinct separation between species.'
                },
                {
                    title: 'Correlation Heatmap',
                    icon: '🔗',
                    visualization: '4×4 correlation matrix of all features',
                    insight: 'Petal length and width are highly correlated (r=0.96), suggesting redundancy. Sepal width shows weak correlation with other features.'
                },
                {
                    title: 'Scatter Plot Matrix',
                    icon: '🎯',
                    chartType: 'iris_scatter',
                    insight: 'Linear separability exists for Setosa. Versicolor and Virginica show overlap in sepal dimensions but separate well in petal space.'
                },
                {
                    title: 'Box Plots by Species',
                    icon: '📦',
                    visualization: 'Feature ranges per class with outlier detection',
                    insight: 'Virginica shows highest variance across all features. Minimal outliers detected, indicating clean data quality.'
                }
            ],
            'wine': [
                {
                    title: 'Chemical Composition',
                    icon: '🧪',
                    chartType: 'wine_chemical',
                    insight: 'Cultivar 0 has distinctly higher proline content (1115 mg/L vs 519/629). Alcohol content varies significantly (13.7% vs 12.3% vs 13.2%).'
                },
                {
                    title: 'Feature Variance Analysis',
                    icon: '⚡',
                    visualization: 'Horizontal bar chart showing variance per feature',
                    insight: 'Proline (variance=99166) and Malic Acid (variance=1.24) are most discriminative. Color intensity shows moderate variance.'
                },
                {
                    title: 'PCA Biplot',
                    icon: '🔄',
                    visualization: '2D projection of first two principal components',
                    insight: 'First two PCs explain 55% of variance. Cultivar 0 separates well, while 1 and 2 show partial overlap in PC space.'
                },
                {
                    title: 'Correlation Matrix',
                    icon: '🔗',
                    visualization: '13×13 heatmap of feature correlations',
                    insight: 'Total phenols and flavonoids highly correlated (r=0.86). Alcohol negatively correlates with malic acid (r=-0.31).'
                }
            ],
            'california_housing': [
                {
                    title: 'Price Distribution',
                    icon: '💰',
                    visualization: 'Histogram with statistical overlay',
                    insight: 'Right-skewed distribution with ceiling effect at $500k. Median price: $180k. Mean: $207k indicates positive skew.'
                },
                {
                    title: 'Geographic Heatmap',
                    icon: '🗺️',
                    visualization: 'Latitude/Longitude scatter colored by median house value',
                    insight: 'Coastal areas (San Francisco, Los Angeles) command premium prices. Inland regions show lower values with less variance.'
                },
                {
                    title: 'Income vs Price',
                    icon: '📈',
                    chartType: 'housing_price',
                    insight: 'Strong positive correlation (r=0.69). Each unit increase in median income predicts ~$40k increase in house value.'
                },
                {
                    title: 'Feature Correlation',
                    icon: '🔗',
                    visualization: '8×8 correlation matrix',
                    insight: 'Rooms and bedrooms highly correlated (r=0.92). Latitude shows negative correlation with price (r=-0.14).'
                }
            ],
            'breast_cancer': [
                {
                    title: 'Class Distribution',
                    icon: '⚖️',
                    chartType: 'cancer_class',
                    insight: 'Imbalanced dataset: 63% benign (357), 37% malignant (212). Consider stratified sampling for model training.'
                },
                {
                    title: 'Feature Distributions',
                    icon: '📊',
                    visualization: 'Violin plots comparing benign vs malignant',
                    insight: 'Mean radius separates classes well (benign: 12.1, malignant: 17.5). Texture shows significant overlap.'
                },
                {
                    title: 'Correlation Heatmap',
                    icon: '🔗',
                    visualization: '30×30 correlation matrix',
                    insight: 'Radius, perimeter, and area nearly perfectly correlated (r>0.99). Consider dimensionality reduction to remove redundancy.'
                },
                {
                    title: 'Decision Boundary',
                    icon: '🎯',
                    visualization: '2D projection showing class separation',
                    insight: 'Linear boundary achieves 95% separation in mean radius/texture space. Non-linear methods may improve further.'
                }
            ],
            'diabetes': [
                {
                    title: 'Progression Distribution',
                    icon: '📊',
                    visualization: 'Histogram of disease progression values',
                    insight: 'Approximately normal distribution centered at 152. Range: 25-346. Standard deviation: 77.1.'
                },
                {
                    title: 'BMI vs Progression',
                    icon: '📈',
                    chartType: 'diabetes_bmi',
                    insight: 'Moderate positive correlation (r=0.39). BMI alone explains 15% of variance in disease progression.'
                },
                {
                    title: 'Feature Correlation',
                    icon: '🔗',
                    visualization: '10×10 correlation matrix',
                    insight: 'Blood pressure (r=0.44) and BMI (r=0.39) are strongest predictors. Age shows weak correlation (r=0.19).'
                },
                {
                    title: 'Residual Analysis',
                    icon: '🔍',
                    visualization: 'Residual plot from linear regression',
                    insight: 'Heteroscedasticity detected: variance increases with fitted values. Consider log transformation or robust regression.'
                }
            ],
            'titanic': [
                {
                    title: 'Survival by Class/Gender',
                    icon: '⚖️',
                    chartType: 'titanic_survival',
                    insight: 'Gender disparity: 74% female survival vs 19% male. First class: 63% survival, Third class: 24%.'
                },
                {
                    title: 'Age Distribution',
                    icon: '👥',
                    visualization: 'Histogram with survival overlay',
                    insight: 'Children (<18) had 54% survival rate. Elderly (>60) had 23% survival. Age missing for 20% of passengers.'
                },
                {
                    title: 'Fare Analysis',
                    icon: '💰',
                    visualization: 'Box plot by passenger class',
                    insight: 'Extreme outliers in 1st class (max: £512). Median fares: 1st=£60, 2nd=£15, 3rd=£8.'
                },
                {
                    title: 'Embarkation Patterns',
                    icon: '🚢',
                    visualization: 'Stacked bar chart by port',
                    insight: 'Southampton (72% of passengers) had lowest survival (34%). Cherbourg passengers had highest survival (55%).'
                }
            ],
            'tips': [
                {
                    title: 'Tip Distribution',
                    icon: '💵',
                    visualization: 'Histogram with statistical overlay',
                    insight: 'Right-skewed distribution. Mean: $3.00, Median: $2.90. Range: $1.00-$10.00.'
                },
                {
                    title: 'Bill vs Tip',
                    icon: '📈',
                    chartType: 'tips_bill',
                    insight: 'Strong linear relationship (r=0.68). Average tip rate: 16%. Outliers suggest generous tippers (>25%).'
                },
                {
                    title: 'Day of Week Effect',
                    icon: '📅',
                    visualization: 'Box plots by day',
                    insight: 'Sunday shows highest median tips ($3.26). Saturday has most variance. Thursday-Friday show consistent patterns.'
                },
                {
                    title: 'Smoker Analysis',
                    icon: '🚭',
                    visualization: 'Violin plots comparing smokers vs non-smokers',
                    insight: 'No significant difference in tip amounts (p=0.34). Smokers: $3.01, Non-smokers: $2.99.'
                }
            ],
            'penguins': [
                {
                    title: 'Species Distribution',
                    icon: '🐧',
                    chartType: 'penguins_species',
                    insight: 'Adelie: 152 (44%), Gentoo: 124 (36%), Chinstrap: 68 (20%). Relatively balanced for classification tasks.'
                },
                {
                    title: 'Bill Dimensions',
                    icon: '📏',
                    visualization: 'Scatter: Bill Length vs Depth',
                    insight: 'Clear species clustering. Gentoo has longest bills (47mm) but shallowest depth (15mm). Chinstrap shows highest depth (18mm).'
                },
                {
                    title: 'Body Mass Comparison',
                    icon: '⚖️',
                    visualization: 'Box plots by species',
                    insight: 'Gentoo significantly heavier (5076g avg) than Adelie (3701g) and Chinstrap (3733g). Low overlap in distributions.'
                },
                {
                    title: 'Sexual Dimorphism',
                    icon: '♂️♀️',
                    visualization: 'Violin plots comparing male vs female',
                    insight: 'Males have longer flippers (+7mm), deeper bills (+1.5mm), and higher body mass (+700g) across all species.'
                }
            ],
            'diamonds': [
                {
                    title: 'Price Distribution',
                    icon: '💎',
                    visualization: 'Histogram with log scale',
                    insight: 'Highly right-skewed. Median: $2,401, Mean: $3,933. 75th percentile: $5,324. Max: $18,823.'
                },
                {
                    title: 'Carat vs Price',
                    icon: '📈',
                    chartType: 'diamonds_price',
                    insight: 'Non-linear relationship: Price ∝ Carat^1.9. Each carat increase has exponentially larger price impact.'
                },
                {
                    title: 'Cut Quality Impact',
                    icon: '✂️',
                    visualization: 'Box plots by cut grade',
                    insight: 'Counterintuitive: Ideal cut has lower median price ($1,810) than Fair ($4,359). Confounded by carat weight.'
                },
                {
                    title: 'Color Grading',
                    icon: '🌈',
                    visualization: 'Violin plots by color grade',
                    insight: 'D (colorless) commands premium. Each grade decrease (D→J) reduces price by ~$1,000 on average.'
                }
            ],
            'macrodata': [
                {
                    title: 'GDP Trend',
                    icon: '📈',
                    chartType: 'macrodata_gdp',
                    insight: 'Strong upward trend with 3.2% average quarterly growth. 2008 recession clearly visible as sharp decline.'
                },
                {
                    title: 'Unemployment Rate',
                    icon: '👷',
                    visualization: 'Line plot with recession shading',
                    insight: 'Counter-cyclical pattern. Peaks during recessions (1982: 10.8%, 2009: 9.3%). Low during expansions (1969: 3.5%).'
                },
                {
                    title: 'Inflation Analysis',
                    icon: '💰',
                    visualization: 'Bar chart of CPI changes',
                    insight: 'High volatility 1970s-80s (peak: 14.8% in 1980). Stabilized post-1990 (avg: 2.5%). Fed policy impact visible.'
                },
                {
                    title: 'Correlation Matrix',
                    icon: '🔗',
                    visualization: 'Heatmap of economic indicators',
                    insight: 'GDP and consumption highly correlated (r=0.99). Unemployment negatively correlates with GDP (r=-0.78).'
                }
            ],
            'mnist': [
                {
                    title: 'Class Distribution',
                    icon: '🔢',
                    chartType: 'mnist_digits',
                    insight: 'Relatively balanced: each digit appears 5,400-6,700 times (±10%). Digit 1 most common (6,742), digit 5 least (5,421).'
                },
                {
                    title: 'Pixel Intensity Heatmap',
                    icon: '🎨',
                    visualization: 'Average pixel values per digit',
                    insight: 'Digit 1 has lowest average intensity (sparse, vertical line). Digit 0 and 8 have highest (filled circles).'
                },
                {
                    title: 'Sample Grid',
                    icon: '🖼️',
                    visualization: '10×10 grid of random digits',
                    insight: 'High variability in handwriting styles. Some digits nearly illegible. Rotation and stroke width vary significantly.'
                },
                {
                    title: 'PCA Variance',
                    icon: '🔄',
                    visualization: 'Scree plot of explained variance',
                    insight: 'First 50 components explain 85% of variance. First PC captures 9.7%. Dimensionality reduction highly effective.'
                }
            ]
        };
        return visualizations[datasetId] || [];
    };

    // Helper function to get statistical summary for each dataset
    const getStatisticalSummary = (datasetId: string) => {
        const summaries: Record<string, any[]> = {
            'iris': [
                { label: 'Mean Sepal Length', value: '5.84', description: 'cm' },
                { label: 'Std Deviation', value: '0.83', description: 'Low variance' },
                { label: 'Skewness', value: '0.31', description: 'Slightly right' },
                { label: 'Class Balance', value: '33%', description: 'Per species' }
            ],
            'wine': [
                { label: 'Mean Alcohol', value: '13.0%', description: 'Content' },
                { label: 'Proline Range', value: '278-1680', description: 'mg/L' },
                { label: 'Max Correlation', value: '0.86', description: 'Phenols-Flavonoids' },
                { label: 'Class Balance', value: '33%', description: 'Per cultivar' }
            ],
            'california_housing': [
                { label: 'Median Price', value: '$180k', description: 'House value' },
                { label: 'Price Range', value: '$15k-$500k', description: 'Min-Max' },
                { label: 'Avg Rooms', value: '5.4', description: 'Per household' },
                { label: 'Occupancy', value: '3.1', description: 'Persons/house' }
            ],
            'breast_cancer': [
                { label: 'Benign Rate', value: '63%', description: '357 samples' },
                { label: 'Feature Count', value: '30', description: 'High dimensional' },
                { label: 'Mean Radius', value: '14.1', description: 'mm' },
                { label: 'Correlation', value: '0.99', description: 'Radius-Perimeter' }
            ],
            'diabetes': [
                { label: 'Mean Progression', value: '152', description: 'Disease metric' },
                { label: 'Std Deviation', value: '77.1', description: 'High variance' },
                { label: 'BMI Correlation', value: '0.39', description: 'Moderate' },
                { label: 'Age Correlation', value: '0.19', description: 'Weak' }
            ],
            'titanic': [
                { label: 'Survival Rate', value: '38%', description: '342/891' },
                { label: 'Female Survival', value: '74%', description: 'vs 19% male' },
                { label: 'Missing Age', value: '20%', description: '177 passengers' },
                { label: 'Class 1 Survival', value: '63%', description: 'vs 24% class 3' }
            ],
            'tips': [
                { label: 'Mean Tip', value: '$3.00', description: 'Average' },
                { label: 'Tip Rate', value: '16%', description: 'Of bill' },
                { label: 'Bill-Tip Corr', value: '0.68', description: 'Strong linear' },
                { label: 'Day Effect', value: 'p=0.02', description: 'Significant' }
            ],
            'penguins': [
                { label: 'Adelie Count', value: '152', description: '44% of total' },
                { label: 'Gentoo Mass', value: '5076g', description: 'Heaviest' },
                { label: 'Bill Length', value: '44mm', description: 'Average' },
                { label: 'Sex Dimorphism', value: '+700g', description: 'Male heavier' }
            ],
            'diamonds': [
                { label: 'Median Price', value: '$2,401', description: 'Middle value' },
                { label: 'Carat Exponent', value: '1.9', description: 'Price ∝ Carat^1.9' },
                { label: 'Color Impact', value: '$1,000', description: 'Per grade' },
                { label: 'Dataset Size', value: '53,940', description: 'Samples' }
            ],
            'macrodata': [
                { label: 'Time Span', value: '50 years', description: '1959-2009' },
                { label: 'GDP Growth', value: '3.2%', description: 'Quarterly avg' },
                { label: 'Peak Unemployment', value: '10.8%', description: '1982 recession' },
                { label: 'GDP-Consumption', value: '0.99', description: 'Correlation' }
            ],
            'mnist': [
                { label: 'Training Samples', value: '60,000', description: 'Images' },
                { label: 'Image Size', value: '28×28', description: '784 pixels' },
                { label: 'Class Balance', value: '±10%', description: 'Per digit' },
                { label: 'PCA Variance', value: '85%', description: 'First 50 PCs' }
            ]
        };
        return summaries[datasetId] || [];
    };

    const datasets: Dataset[] = [
        {
            id: 'iris',
            name: 'Iris Flower',
            library: 'Scikit-Learn',
            description: 'The Golden Standard for Linear Classifiers. Measuring sepal and petal dimensions across 3 species.',
            source: 'sklearn.datasets.load_iris()',
            task: 'Classification',
            samples: 150,
            features: 4,
            classes: 3,
            featureNames: ['sepal_length', 'sepal_width', 'petal_length', 'petal_width'],
            targetNames: ['Setosa', 'Versicolor', 'Virginica'],
            useCases: ['Euclidean Distance Modelling', 'LDA', 'Probability Density Estimation']
        },
        {
            id: 'wine',
            name: 'Wine Chemistry',
            library: 'Scikit-Learn',
            description: 'A Multi-variate Chemical Tensor. 13 chemical features from three different Italian cultivars.',
            source: 'sklearn.datasets.load_wine()',
            task: 'Classification',
            samples: 178,
            features: 13,
            classes: 3,
            useCases: ['Regularization', 'Clustering', 'Dimensionality Reduction']
        },
        {
            id: 'california_housing',
            name: 'California Housing',
            library: 'Scikit-Learn',
            description: 'Large-scale regression data based on 1990 California census. Predict median house values.',
            source: 'sklearn.datasets.fetch_california_housing()',
            task: 'Regression',
            samples: 20640,
            features: 8,
            useCases: ['Gradient Descent Optimization', 'Feature Interaction Modelling']
        },
        {
            id: 'breast_cancer',
            name: 'Breast Cancer',
            library: 'Scikit-Learn',
            description: 'Binary classification of tumor masses based on digitized images of fine needle aspirates (FNA).',
            source: 'sklearn.datasets.load_breast_cancer()',
            task: 'Classification',
            samples: 569,
            features: 30,
            classes: 2,
            useCases: ['Risk Factor Modelling', 'Support Vector Machines']
        },
        {
            id: 'diabetes',
            name: 'Diabetes Progression',
            library: 'Scikit-Learn',
            description: 'Ten baseline variables, age, sex, BMI, BP and six blood serum measurements.',
            source: 'sklearn.datasets.load_diabetes()',
            task: 'Regression',
            samples: 442,
            features: 10,
            useCases: ['Lasso/Ridge Regularization', 'Predictive Analysis']
        },
        {
            id: 'titanic',
            name: 'Titanic Survival',
            library: 'Seaborn',
            description: 'Classify survival status based on age, gender, cabin, and fare class.',
            source: 'sns.load_dataset("titanic")',
            task: 'Classification',
            samples: 891,
            features: 15,
            classes: 2,
            useCases: ['Categorical Encoding', 'Mixed Data Modelling']
        },
        {
            id: 'tips',
            name: 'Restaurant Tips',
            library: 'Seaborn',
            description: 'Predict tip amounts based on bill amount, day, time, and smoker status.',
            source: 'sns.load_dataset("tips")',
            task: 'Regression',
            samples: 244,
            features: 7,
            useCases: ['Bivariate Regression', 'Correlation Analysis']
        },
        {
            id: 'penguins',
            name: 'Palmer Penguins',
            library: 'Seaborn',
            description: 'Modern alternative to Iris. Palmer Archipelago (Antarctica) penguin measurements.',
            source: 'sns.load_dataset("penguins")',
            task: 'Classification',
            samples: 344,
            features: 7,
            classes: 3,
            useCases: ['Cluster Analysis', 'Biometric Classification']
        },
        {
            id: 'diamonds',
            name: 'Diamond Pricing',
            library: 'Seaborn',
            description: 'Predict diamond prices using carat, cut, color, and geometric dimensions.',
            source: 'sns.load_dataset("diamonds")',
            task: 'Regression',
            samples: 53940,
            features: 10,
            useCases: ['Non-Linear Price Modelling', 'High Range Variance']
        },
        {
            id: 'macrodata',
            name: 'US Macroeconomic',
            library: 'Statsmodels',
            description: 'Quarterly US macroeconomic metrics from 1959Q1 to 2009Q3 (Unemployment, GDP).',
            source: 'sm.datasets.macrodata.load_pandas()',
            task: 'Time Series',
            samples: 203,
            features: 14,
            useCases: ['Econometric Forecasting', 'Vector Autoregression']
        },
        {
            id: 'mnist',
            name: 'MNIST Digits',
            library: 'Deep Learning',
            description: 'Large database of handwritten digits used for training various image processing systems.',
            source: 'keras.datasets.mnist',
            task: 'Image',
            samples: 60000,
            features: '28x28 Tensors',
            classes: 10,
            useCases: ['CNN Architecture Tests', 'Kernel Optimization']
        }
    ];

    const filteredDatasets = filter === 'All' ? datasets : datasets.filter(d => d.library === filter);
    const currentDataset = datasets.find(d => d.id === selectedDataset) || datasets[0];

    if (!mounted) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="font-black text-indigo-400 tracking-[0.3em] text-xs uppercase animate-pulse">Scanning Global Assets</div>
            </div>
        );
    }

    return (
        <Layout>
            <main className="container mx-auto px-6 py-20 max-w-7xl">
                {/* Hero Section */}
                <div className="bg-slate-900 rounded-[4rem] p-16 md:p-20 mb-20 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-600/20 blur-[180px] rounded-full -z-10"></div>
                    <div className="relative z-10 max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-10 border border-indigo-500/20">
                            The Data Foundation
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter">Mastering the <span className="text-indigo-400 italic">Multivariate Tensors.</span></h1>
                        <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                            Data is a sampled observation of a mathematical function. Explore the standard tensors provided by Python's core libraries to begin your architectural discovery.
                        </p>
                    </div>
                </div>

                {/* Library Filters */}
                <div className="flex flex-wrap gap-3 mb-16 bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm w-max max-w-full">
                    {['All', 'Scikit-Learn', 'Seaborn', 'Statsmodels', 'Deep Learning'].map(lib => (
                        <button
                            key={lib}
                            onClick={() => setFilter(lib as any)}
                            className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${filter === lib
                                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100 scale-[1.02]'
                                : 'bg-transparent text-slate-400 hover:text-slate-900'
                                }`}
                        >
                            {lib}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Sidebar: Dataset List */}
                    <div className="lg:col-span-4 space-y-4 max-h-[900px] overflow-y-auto pr-4 custom-scrollbar">
                        {filteredDatasets.map((dataset) => (
                            <button
                                key={dataset.id}
                                onClick={() => setSelectedDataset(dataset.id)}
                                className={`w-full p-8 rounded-[2.5rem] text-left transition-all duration-500 group border-2 ${selectedDataset === dataset.id
                                    ? 'bg-white border-indigo-600 shadow-2xl shadow-indigo-100 -translate-y-1'
                                    : 'bg-white border-slate-50 hover:border-indigo-200 text-slate-500'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${dataset.task === 'Classification' ? 'bg-emerald-50 text-emerald-600' :
                                        dataset.task === 'Regression' ? 'bg-amber-50 text-amber-600' :
                                            'bg-purple-50 text-purple-600'
                                        }`}>
                                        {dataset.task}
                                    </span>
                                    <span className="text-[8px] font-black text-slate-300 uppercase opacity-50">{dataset.library}</span>
                                </div>
                                <h3 className={`text-xl font-black leading-tight transition-colors mb-2 ${selectedDataset === dataset.id ? 'text-indigo-600' : 'text-slate-900'
                                    }`}>
                                    {dataset.name}
                                </h3>
                                <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
                                    <span>N={dataset.samples}</span>
                                    <span className="w-1 h-1 bg-slate-200 rounded-full mt-1.5"></span>
                                    <span>M={dataset.features} Features</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[4rem] p-12 md:p-16 border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-bl-[4rem] group-hover:bg-indigo-100/50 transition-colors"></div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 relative z-10">
                                <div>
                                    <h2 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{currentDataset.name}</h2>
                                    <p className="text-indigo-500 font-black uppercase text-[10px] tracking-[0.3em]">{currentDataset.library} • {currentDataset.task}</p>
                                </div>
                                <div className="p-6 bg-slate-950 rounded-[2rem] font-mono text-xs text-indigo-400 border border-white/5 shadow-2xl flex items-center gap-3">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                                    {currentDataset.source}
                                </div>
                            </div>

                            <p className="text-2xl text-slate-500 leading-relaxed font-light mb-16 max-w-2xl italic tracking-tight">
                                "{currentDataset.description}"
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                                {[
                                    { label: 'Space Dimension', value: currentDataset.samples, sub: 'Observations', color: 'indigo' },
                                    { label: 'Feature Tensors', value: currentDataset.features, sub: 'Degrees of Freedom', color: 'emerald' },
                                    { label: 'Class Labels', value: currentDataset.classes || 'N/A', sub: 'Unique Manifolds', color: 'purple' },
                                    { label: 'Ideal Algorithm', value: currentDataset.task === 'Classification' ? 'SVM' : 'LASSO', sub: 'Highest Prob.', color: 'rose' }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-indigo-300 transition-all duration-300 group">
                                        <span className="text-[9px] font-black uppercase text-slate-400 mb-4 block tracking-widest">{stat.label}</span>
                                        <div className="text-4xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{stat.value}</div>
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-slate-300">{stat.sub}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <section>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">Architectural Use Cases</h4>
                                    <div className="space-y-6">
                                        {currentDataset.useCases.map((use, i) => (
                                            <div key={i} className="flex gap-6 items-center group">
                                                <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-[10px] font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">0{i + 1}</div>
                                                <span className="text-sm font-bold text-slate-700 tracking-tight">{use}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                <section className="space-y-8">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-8 border-b border-indigo-50 pb-4">Python Import Code</h4>
                                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl border border-white/10 group hover:border-indigo-500/30 transition-all">
                                        <div className="flex items-start justify-between mb-6">
                                            <p className="text-xs font-light text-slate-300 leading-relaxed">
                                                Load this dataset directly into your Python environment using the code below.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(getImportCode(currentDataset.id));
                                                }}
                                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 flex items-center gap-2"
                                                title="Copy to clipboard"
                                            >
                                                <span>📋</span>
                                                <span>Copy</span>
                                            </button>
                                        </div>
                                        <CodeBlock language="python" code={getImportCode(currentDataset.id)} />
                                    </div>
                                </section>
                            </div>

                            {/* Statistical Summary */}
                            <div className="mt-20">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 border-b border-slate-50 pb-4">Statistical Summary</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {getStatisticalSummary(currentDataset.id).map((stat, idx) => (
                                        <div key={idx} className="bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all border border-slate-100">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                                {stat.label}
                                            </p>
                                            <p className="text-3xl font-black text-indigo-600 mb-1">{stat.value}</p>
                                            <p className="text-[9px] text-slate-500 font-medium">{stat.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* EDA Visualizations */}
                            <div className="mt-20">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 border-b border-slate-50 pb-4">Exploratory Data Analysis</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {getEDAVisualizations(currentDataset.id).map((viz, idx) => {
                                        const chartConfig = viz.chartType ? getChartData(currentDataset.id, viz.chartType) : null;
                                        return (
                                            <div key={idx} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h5 className="text-lg font-black text-slate-900">{viz.title}</h5>
                                                    <span className="text-2xl">{viz.icon}</span>
                                                </div>
                                                <div className="bg-slate-50 rounded-2xl p-6 mb-6 border border-slate-100" style={{ height: '240px' }}>
                                                    {chartConfig ? (
                                                        <div className="h-full">
                                                            {chartConfig.type === 'bar' && <Bar data={chartConfig.data} options={chartConfig.options} />}
                                                            {chartConfig.type === 'line' && <Line data={chartConfig.data} options={chartConfig.options} />}
                                                            {chartConfig.type === 'scatter' && <Scatter data={chartConfig.data} options={chartConfig.options} />}
                                                            {chartConfig.type === 'doughnut' && <Doughnut data={chartConfig.data} options={chartConfig.options} />}
                                                        </div>
                                                    ) : (
                                                        <div className="h-full flex items-center justify-center">
                                                            <p className="text-slate-400 text-xs font-medium text-center leading-relaxed px-4">{viz.visualization}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3">💡 Insight</p>
                                                    <p className="text-sm text-slate-700 leading-relaxed">{viz.insight}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* ML Workflow Navigation */}
                        <div className="mt-20">
                            <WorkflowNavButtons currentStep="datasets" />
                        </div>

                        {/* CTA Lab Navigation */}
                        <div className="mt-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl group">
                            <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-20"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                            <div className="relative z-10 text-center">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200 mb-8 block">Next Structural Phase</span>
                                <h3 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-tight">Master Exploratory <br />Mathematical Analysis</h3>
                                <Link
                                    href="/eda"
                                    className="bg-white text-indigo-600 px-16 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition active:scale-95 shadow-2xl flex items-center justify-center gap-3 w-max mx-auto group"
                                >
                                    Activate EDA Lab
                                    <span className="text-xl transition-transform group-hover:translate-x-2">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
            .custom - scrollbar:: -webkit - scrollbar { width: 5px; }
                .custom - scrollbar:: -webkit - scrollbar - track { background: transparent; }
                .custom - scrollbar:: -webkit - scrollbar - thumb { background: #cbd5e1; border - radius: 10px; }
                .custom - scrollbar { scrollbar - width: thin; scrollbar - color: #cbd5e1 transparent; }
`}</style>
        </Layout>
    );
};

export default DatasetsPage;
