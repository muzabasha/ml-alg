# Student Learning Path - Data Models Documentation

This directory contains all TypeScript type definitions, interfaces, and enums for the Student Learning Path feature.

## File Structure

```
types/
├── learning-path.ts          # Core type definitions and interfaces
├── index.ts                  # Central export file
└── README.md                 # This file

schemas/
└── learning-path-schemas.ts  # JSON schemas for data validation

config/
├── algorithms.ts             # Algorithm configuration with prerequisites
├── achievements.ts           # Achievement definitions
└── challenges.ts             # Practice challenge definitions
```

## Core Data Models

### Enums

#### DifficultyLevel
Defines the three difficulty tiers for algorithms:
- `Beginner` - Foundational algorithms (5 algorithms)
- `Intermediate` - Mid-level algorithms (2 algorithms)
- `Advanced` - Complex algorithms (4 algorithms)

#### MasteryStatus
Tracks student progress on each algorithm:
- `not_started` - Algorithm not yet accessed
- `in_progress` - Some steps completed
- `completed` - All 6 steps finished
- `mastered` - All steps + challenge completed

#### WorkflowStep
The 6-step ML workflow:
1. `theory` - Algorithm Theory
2. `dataset` - Dataset Selection
3. `eda` - Exploratory Data Analysis
4. `preprocessing` - Data Preprocessing
5. `feature_engineering` - Feature Engineering
6. `train_evaluate` - Train & Evaluate

### Core Interfaces

#### Algorithm
Defines an ML algorithm with metadata:
```typescript
{
  id: string;                    // Unique identifier
  name: string;                  // Display name
  difficulty: DifficultyLevel;   // Beginner/Intermediate/Advanced
  category: string;              // e.g., "Classification", "Regression"
  mathFocus: string;             // Key mathematical concept
  prerequisites: string[];       // Required algorithm IDs
  estimatedTime: number;         // Total minutes to complete
  steps: Record<WorkflowStep, StepMetadata>;
}
```

#### StudentProgress
Complete student progress data:
```typescript
{
  studentId: string;
  onboardingComplete: boolean;
  lastAccessDate: Date;
  totalTimeSpent: number;
  algorithmProgress: Record<string, AlgorithmProgress>;
  achievements: Record<string, AchievementRecord>;
  dailyActivity: Record<string, DailyActivity>;
  certificates: Certificate[];
}
```

#### AlgorithmProgress
Progress for a single algorithm:
```typescript
{
  algorithmId: string;
  status: MasteryStatus;
  completedSteps: WorkflowStep[];
  completionPercentage: number;  // 0-100
  lastAccessedDate: Date;
  timeSpent: number;             // minutes
  challengeAttempts: ChallengeAttempt[];
  challengeCompleted: boolean;
}
```

## Prerequisite Relationships

Defined in `config/algorithms.ts`:

```
Beginner (no prerequisites):
- linear_regression
- logistic_regression
- knn
- kmeans
- naive_bayes

Intermediate (requires all Beginner):
- decision_tree
- svm

Advanced (requires all Intermediate):
- ann
- cnn
- rnn
- transformer
```

## Data Validation

JSON schemas are provided in `schemas/learning-path-schemas.ts` for runtime validation:

### Available Validators
- `validateStudentProgress(data)` - Validates complete progress data
- `validateAlgorithmProgress(data)` - Validates single algorithm progress
- `validateChallenge(data)` - Validates challenge structure
- `validateAchievement(data)` - Validates achievement data
- `validateRecommendation(data)` - Validates recommendation structure
- `validateCertificate(data)` - Validates certificate data

### Usage Example
```typescript
import { validateStudentProgress } from '@/schemas/learning-path-schemas';

try {
  validateStudentProgress(progressData);
  console.log('Valid progress data');
} catch (error) {
  console.error('Validation error:', error.message);
}
```

## Constants

Key constants defined in `types/learning-path.ts`:

- `TOTAL_WORKFLOW_STEPS = 6` - Number of steps per algorithm
- `TOTAL_ALGORITHMS = 11` - Total number of algorithms
- `MIN_CHALLENGE_COMPLETION_PERCENTAGE = 0.8` - 80% challenges required for level unlock
- `SYNC_DEBOUNCE_MS = 500` - Debounce time for backend sync
- `PROGRESS_STORAGE_KEY` - LocalStorage key for progress
- `ONBOARDING_STORAGE_KEY` - LocalStorage key for onboarding status

## Serialization

For localStorage and API communication, use serializable versions:

- `SerializableStudentProgress` - Dates as ISO strings
- `SerializableAlgorithmProgress` - Dates as ISO strings
- `SerializableAchievementRecord` - Dates as ISO strings
- `SerializableChallengeAttempt` - Dates as ISO strings

## Importing

Use the central export file for convenience:

```typescript
// Import everything
import * from '@/types';

// Or import specific items
import {
  Algorithm,
  StudentProgress,
  MasteryStatus,
  WorkflowStep,
  ALGORITHMS,
  ACHIEVEMENTS
} from '@/types';
```

## Requirements Mapping

This data model implementation satisfies the following requirements:

- **Requirement 1.1**: Algorithm difficulty organization (DifficultyLevel enum, Algorithm interface)
- **Requirement 3.1**: Progress tracking (StudentProgress, AlgorithmProgress interfaces)
- **Requirement 8.2**: Achievement system (Achievement interface, ACHIEVEMENTS config)
- **Requirement 15.1**: Certificate system (Certificate interface, CertificateType enum)

## Testing

Property-based tests for these data models are located in:
- `frontend/src/__tests__/properties/algorithm-config.test.ts`

The tests validate:
- **Property 1**: Algorithm Difficulty Organization
- Prerequisite relationship integrity
- Data structure consistency
