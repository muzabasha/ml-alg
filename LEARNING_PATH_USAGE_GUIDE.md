# Learning Path System - Usage Guide

## Overview

The Learning Path system is now fully integrated and ready to use. This guide shows how to use the system in your components.

## Quick Start

### 1. Using the Context

The `LearningPathProvider` is already wrapped around your app in `_app.tsx`. You can use the hooks anywhere in your components:

```tsx
import { useLearningPath } from '../contexts/LearningPathContext';

function MyComponent() {
  const { getOverallProgress, markStepComplete } = useLearningPath();
  
  const progress = getOverallProgress();
  
  return <div>Progress: {progress.percentage}%</div>;
}
```

### 2. Specialized Hooks

Use specialized hooks for specific features:

```tsx
import { useProgress } from '../contexts/LearningPathContext';

function ProgressComponent() {
  const { getOverallProgress, getCurrentStreak } = useProgress();
  
  return (
    <div>
      <p>Progress: {getOverallProgress().percentage}%</p>
      <p>Streak: {getCurrentStreak()} days</p>
    </div>
  );
}
```

## Common Use Cases

### Tracking Progress

```tsx
import { useProgress } from '../contexts/LearningPathContext';
import { WorkflowStep } from '../types/learning-path';

function AlgorithmPage({ algorithmId }: { algorithmId: string }) {
  const { markStepComplete, getAlgorithmStatus } = useProgress();
  
  const handleStepComplete = () => {
    markStepComplete(algorithmId, WorkflowStep.Theory);
  };
  
  return (
    <button onClick={handleStepComplete}>
      Complete Theory Step
    </button>
  );
}
```

### Checking Algorithm Lock Status

```tsx
import { useAlgorithmNavigation } from '../hooks/useAlgorithmNavigation';

function AlgorithmLink({ algorithmId }: { algorithmId: string }) {
  const { getAlgorithmLockStatus, navigateToAlgorithm } = useAlgorithmNavigation();
  
  const lockStatus = getAlgorithmLockStatus(algorithmId);
  
  if (!lockStatus.unlocked) {
    return (
      <div>
        <p>🔒 Locked</p>
        <p>{lockStatus.reason}</p>
      </div>
    );
  }
  
  return (
    <button onClick={() => navigateToAlgorithm(algorithmId)}>
      Start Algorithm
    </button>
  );
}
```

### Displaying Recommendations

```tsx
import { useRecommendations } from '../contexts/LearningPathContext';

function RecommendationWidget() {
  const { getNextRecommendation, getPersonalizedTips } = useRecommendations();
  
  const recommendation = getNextRecommendation();
  const tips = getPersonalizedTips();
  
  return (
    <div>
      <h3>Next: {recommendation.reason}</h3>
      <ul>
        {tips.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>
    </div>
  );
}
```

### Showing Achievements

```tsx
import { useAchievements } from '../contexts/LearningPathContext';

function AchievementsList() {
  const { getEarnedAchievements, getTotalPoints } = useAchievements();
  
  const achievements = getEarnedAchievements();
  const points = getTotalPoints();
  
  return (
    <div>
      <h3>Total Points: {points}</h3>
      {achievements.map(achievement => (
        <div key={achievement.id}>
          <span>{achievement.icon}</span>
          <span>{achievement.title}</span>
        </div>
      ))}
    </div>
  );
}
```

### Handling Challenges

```tsx
import { useChallenges } from '../contexts/LearningPathContext';
import { useState } from 'react';

function ChallengeComponent({ algorithmId }: { algorithmId: string }) {
  const { getChallengeForAlgorithm, submitChallengeResponse } = useChallenges();
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  
  const challenge = getChallengeForAlgorithm(algorithmId);
  
  const handleSubmit = () => {
    const response = {
      challengeId: challenge.id,
      answer,
      timeSpent: 60 // seconds
    };
    
    const assessmentResult = submitChallengeResponse(challenge.id, response);
    setResult(assessmentResult);
  };
  
  return (
    <div>
      <h3>{challenge?.question}</h3>
      {challenge?.options?.map(option => (
        <button key={option} onClick={() => setAnswer(option)}>
          {option}
        </button>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      
      {result && (
        <div>
          <p>{result.correct ? '✓ Correct!' : '✗ Incorrect'}</p>
          <p>Score: {result.score}/100</p>
          <p>{result.feedback}</p>
        </div>
      )}
    </div>
  );
}
```

### Step Navigation

```tsx
import { useStepNavigation } from '../hooks/useStepNavigation';

function StepNavigator({ algorithmId }: { algorithmId: string }) {
  const {
    currentStep,
    stepNumber,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    completeCurrentStep,
    canGoNext,
    canGoPrevious,
    progressPercentage
  } = useStepNavigation(algorithmId);
  
  return (
    <div>
      <p>Step {stepNumber} of {totalSteps}</p>
      <p>Progress: {progressPercentage}%</p>
      
      <button onClick={goToPreviousStep} disabled={!canGoPrevious}>
        Previous
      </button>
      
      <button onClick={completeCurrentStep}>
        Complete Step
      </button>
      
      <button onClick={goToNextStep} disabled={!canGoNext}>
        Next
      </button>
    </div>
  );
}
```

## Available Hooks

### `useLearningPath()`
Main hook with access to all features.

### `useProgress()`
Progress tracking methods:
- `markStepComplete(algorithmId, step)`
- `getAlgorithmStatus(algorithmId)`
- `getAlgorithmProgress(algorithmId)`
- `getOverallProgress()`
- `getCurrentStreak()`

### `useRecommendations()`
Recommendation methods:
- `getNextRecommendation()`
- `getSuggestedAlgorithms(count)`
- `getPersonalizedTips()`

### `useAchievements()`
Achievement methods:
- `getEarnedAchievements()`
- `getLockedAchievements()`
- `getTotalPoints()`
- `getLearningStats()`
- `checkForNewAchievements()`

### `useChallenges()`
Challenge methods:
- `getChallengeForAlgorithm(algorithmId)`
- `submitChallengeResponse(challengeId, response)`
- `getChallengeHistory(algorithmId)`
- `getPerformanceScore(algorithmId)`

### `useAlgorithmNavigation()`
Navigation methods:
- `navigateToAlgorithm(algorithmId)`
- `checkNavigation(algorithmId)`
- `getAlgorithmLockStatus(algorithmId)`

### `useStepNavigation(algorithmId)`
Step navigation methods:
- `goToNextStep()`
- `goToPreviousStep()`
- `goToStep(step)`
- `completeCurrentStep()`
- `isStepCompleted(step)`

## Data Persistence

The system automatically:
- Saves to localStorage on every change
- Debounces backend sync (500ms)
- Loads from localStorage on initialization
- Handles offline scenarios

## Events and Side Effects

The system automatically:
- Checks for new achievements after progress updates
- Detects newly unlocked algorithms after completions
- Marks algorithms as "Mastered" after challenge success
- Updates daily activity tracking
- Calculates streaks

## Example Components

See these files for complete examples:
- `frontend/src/components/ProgressIndicator.tsx` - Progress display
- `frontend/src/components/AlgorithmCard.tsx` - Algorithm card with locks

## TypeScript Support

All types are exported from `frontend/src/types/learning-path.ts`:
- `Algorithm`
- `MasteryStatus`
- `WorkflowStep`
- `DifficultyLevel`
- `Recommendation`
- `Achievement`
- `Challenge`
- `ChallengeResponse`
- `AssessmentResult`
- And many more...

## Best Practices

1. **Always check `isInitialized`** before using context values
2. **Use specialized hooks** for cleaner code
3. **Handle loading states** while context initializes
4. **Refresh data** after mutations using `refreshData()`
5. **Check lock status** before navigation
6. **Validate prerequisites** before showing content

## Troubleshooting

### Context not available
Make sure your component is inside the `LearningPathProvider` in `_app.tsx`.

### State not updating
Call `refreshData()` after mutations or check if you're using the latest context value.

### LocalStorage issues
Check browser console for errors. Clear localStorage if corrupted: `localStorage.removeItem('ml_learning_path_progress')`

## Next Steps

1. Integrate into existing algorithm pages
2. Add dashboard page with progress overview
3. Implement onboarding flow
4. Add achievement notifications
5. Create certificate generation UI
