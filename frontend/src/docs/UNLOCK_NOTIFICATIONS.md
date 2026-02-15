# Unlock Notification System

## Overview

The unlock notification system automatically notifies students when new algorithms become available after completing prerequisites. This implements **Requirement 4.4**: "WHEN all prerequisites for an algorithm are satisfied, THE Learning_Path_System SHALL automatically unlock that algorithm and notify the student."

## Architecture

### Components

1. **PrerequisiteEngine.checkForNewUnlocks()**
   - Core method that detects newly unlocked algorithms
   - Called when an algorithm is completed
   - Returns array of algorithm IDs that are now unlocked

2. **LearningPathManager.handleAlgorithmCompletion()**
   - Wrapper method that calls checkForNewUnlocks
   - Integrates prerequisite validation with progress tracking

3. **LearningPathContext**
   - Orchestrates unlock detection and notification
   - Provides callback hooks for UI notifications
   - Triggers notifications when algorithms are unlocked

4. **useNotifications Hook**
   - Manages notification state
   - Provides methods to show different types of notifications
   - Handles notification lifecycle (show, auto-dismiss, remove)

5. **NotificationContainer Component**
   - Renders toast notifications
   - Stacks multiple notifications vertically
   - Uses the existing Toast component

6. **LearningPathWithNotifications Component**
   - Wrapper that integrates notifications with LearningPathProvider
   - Connects unlock events to notification display
   - Simplifies usage for app developers

## How It Works

### Real-Time Validation Flow

```
1. Student completes a workflow step
   ↓
2. markStepComplete() is called
   ↓
3. Progress is updated
   ↓
4. Check if algorithm is now completed (all 6 steps done)
   ↓
5. If completed, call handleAlgorithmCompletion()
   ↓
6. PrerequisiteEngine.checkForNewUnlocks() validates all algorithms
   ↓
7. For each algorithm that depends on the completed one:
   - Check if all prerequisites are now met
   - If yes, add to unlocked list
   ↓
8. Return list of newly unlocked algorithm IDs
   ↓
9. Trigger onUnlockNotification callback
   ↓
10. Display toast notification for each unlocked algorithm
```

### Prerequisite Validation Logic

The `checkForNewUnlocks` method:

```typescript
checkForNewUnlocks(completedAlgorithmId: string): string[] {
    const newlyUnlocked: string[] = [];

    // Check all algorithms
    Object.keys(ALGORITHMS).forEach(algorithmId => {
        const prerequisites = this.getPrerequisites(algorithmId);

        // Skip if no prerequisites or doesn't depend on completed algorithm
        if (prerequisites.length === 0 || !prerequisites.includes(completedAlgorithmId)) {
            return;
        }

        // Check if this algorithm is now unlocked
        const status = this.progressTracker.getAlgorithmStatus(algorithmId);
        if (status === MasteryStatus.NotStarted && this.arePrerequisitesMet(algorithmId)) {
            newlyUnlocked.push(algorithmId);
        }
    });

    return newlyUnlocked;
}
```

Key points:
- Only checks algorithms that depend on the completed one (optimization)
- Validates that ALL prerequisites are met (not just the one completed)
- Only unlocks algorithms that haven't been started yet
- Returns immediately - no async operations needed

## Usage

### Basic Setup

```tsx
import LearningPathWithNotifications from './components/LearningPathWithNotifications';

function App() {
    return (
        <LearningPathWithNotifications studentId="student123">
            <YourAppComponents />
        </LearningPathWithNotifications>
    );
}
```

### Using in Components

```tsx
import { useLearningPath } from './contexts/LearningPathContext';

function AlgorithmPage() {
    const { markStepComplete } = useLearningPath();

    const handleStepComplete = () => {
        // Notifications happen automatically!
        markStepComplete('linear_regression', WorkflowStep.Theory);
    };

    return <button onClick={handleStepComplete}>Complete Step</button>;
}
```

### Custom Notification Handling

If you need custom notification behavior:

```tsx
import { LearningPathProvider } from './contexts/LearningPathContext';
import { getAlgorithmById } from './config/algorithms';

function App() {
    const handleUnlocks = (algorithmIds: string[]) => {
        algorithmIds.forEach(id => {
            const algo = getAlgorithmById(id);
            // Custom notification logic
            console.log(`Unlocked: ${algo.name}`);
        });
    };

    return (
        <LearningPathProvider
            onUnlockNotification={handleUnlocks}
        >
            <YourAppComponents />
        </LearningPathProvider>
    );
}
```

## Notification Types

### Unlock Notifications
- **Trigger**: Algorithm prerequisites are met
- **Message**: "🎉 [Algorithm Name] is now unlocked! You can start learning it."
- **Type**: Success (green)
- **Duration**: 6 seconds

### Achievement Notifications
- **Trigger**: Achievement earned (e.g., completing difficulty level)
- **Message**: "🏆 Achievement Unlocked: [Achievement Title]"
- **Type**: Success (green)
- **Duration**: 6 seconds

### Completion Notifications
- **Trigger**: Algorithm completed
- **Message**: "✓ Congratulations! You completed [Algorithm Name]"
- **Type**: Success (green)
- **Duration**: 5 seconds

## Integration Points

### With Progress Tracker
- Notifications are triggered during `markStepComplete()`
- Progress is validated in real-time
- No polling or manual refresh needed

### With Prerequisite Engine
- Uses existing `checkForNewUnlocks()` method
- Leverages prerequisite configuration
- Validates all dependencies automatically

### With Achievement System
- Also triggers achievement notifications
- Uses same notification infrastructure
- Consistent user experience

## Testing

To test unlock notifications:

1. Complete all steps of a prerequisite algorithm
2. Observe notification when dependent algorithm unlocks
3. Verify notification displays correct algorithm name
4. Check that notification auto-dismisses after 6 seconds

Example test scenario:
```
1. Complete all 5 Beginner algorithms
2. When the 5th is completed, notifications should appear for:
   - Decision Tree (unlocked)
   - SVM (unlocked)
3. Both notifications should stack vertically
4. Each should auto-dismiss after 6 seconds
```

## Performance Considerations

- **Efficient Validation**: Only checks algorithms that depend on the completed one
- **No Polling**: Event-driven, triggers only on step completion
- **Debounced Sync**: Backend sync is debounced (500ms) to reduce load
- **Optimistic UI**: Notifications appear immediately, sync happens in background

## Accessibility

- Notifications use `role="alert"` for screen reader announcements
- `aria-live="polite"` ensures non-intrusive announcements
- Keyboard accessible close button
- High contrast colors for visibility
- Auto-dismiss prevents notification buildup

## Future Enhancements

Possible improvements:
- Sound effects for unlock notifications
- Animated confetti for major unlocks (difficulty level completion)
- Notification history/log
- Persistent notification preferences
- Notification grouping (e.g., "3 algorithms unlocked")
- Push notifications for mobile apps
