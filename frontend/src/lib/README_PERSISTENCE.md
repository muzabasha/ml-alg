# Progress Persistence Layer

## Overview

The progress persistence layer provides robust progress tracking with:
- **Immediate localStorage caching** for instant UI updates
- **Debounced backend sync (500ms)** to reduce server load
- **Optimistic updates** for responsive UX
- **Automatic rollback** on sync failures
- **Retry logic** with exponential backoff

## Architecture

```
User Action → ProgressTracker → ProgressPersistence
                                      ↓
                        ┌─────────────┴─────────────┐
                        ↓                           ↓
                  localStorage                  Backend API
                  (immediate)                   (debounced 500ms)
```

## Usage

### Basic Setup

```typescript
import { ProgressTracker } from './lib/ProgressTracker';

// Define backend sync callback
const syncToBackend = async (progress: StudentProgress) => {
  const response = await fetch('/api/progress/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(progress)
  });
  
  if (!response.ok) {
    throw new Error('Failed to sync progress');
  }
};

// Create tracker with sync callback
const tracker = new ProgressTracker('student-123', syncToBackend);
```

### Marking Steps Complete

```typescript
// Mark a step complete - automatically persists
tracker.markStepComplete('linear_regression', WorkflowStep.Theory);

// localStorage is updated immediately
// Backend sync is debounced (500ms after last update)
```

### Loading Progress

```typescript
// Load from localStorage on app start
const tracker = ProgressTracker.loadFromLocalStorage('student-123');

if (tracker) {
  // Progress loaded successfully
  const progress = tracker.getOverallProgress();
  console.log(`Overall progress: ${progress.percentage}%`);
}
```

### Force Immediate Sync

```typescript
// Force sync to backend (bypasses debounce)
await tracker.syncProgress();
```

### Checking Sync Status

```typescript
// Check if there are pending syncs
if (tracker.hasPendingSync()) {
  console.log('Progress sync pending...');
}
```

### Cleanup

```typescript
// Cleanup timers when component unmounts
tracker.cleanup();
```

## Features

### 1. Debounced Backend Sync

Multiple rapid updates are batched together:

```typescript
tracker.markStepComplete('linear_regression', WorkflowStep.Theory);
tracker.markStepComplete('linear_regression', WorkflowStep.Dataset);
tracker.markStepComplete('linear_regression', WorkflowStep.EDA);

// Only ONE backend sync call after 500ms
```

### 2. Optimistic Updates

UI updates immediately, backend syncs asynchronously:

```typescript
// Step 1: User marks step complete
tracker.markStepComplete('linear_regression', WorkflowStep.Theory);

// Step 2: localStorage updated immediately (UI can read instantly)
// Step 3: Backend sync scheduled for 500ms later
// Step 4: If sync fails, progress is rolled back
```

### 3. Automatic Rollback

If backend sync fails, progress is automatically rolled back:

```typescript
// Before: 3 steps completed
tracker.markStepComplete('linear_regression', WorkflowStep.FeatureEngineering);

// localStorage: 4 steps completed (optimistic)
// Backend sync fails...
// localStorage: 3 steps completed (rolled back)
```

### 4. Retry Logic

Failed syncs are automatically retried with exponential backoff:

```typescript
// Attempt 1: Immediate
// Attempt 2: After 1 second
// Attempt 3: After 2 seconds
// Max retries: 3
```

## Configuration

Customize persistence behavior:

```typescript
import { ProgressPersistence } from './lib/ProgressPersistence';

const persistence = new ProgressPersistence(syncCallback, {
  debounceMs: 1000,      // Debounce delay (default: 500ms)
  maxRetries: 5,         // Max retry attempts (default: 3)
  retryDelayMs: 2000,    // Base retry delay (default: 1000ms)
  storageKey: 'my_key'   // localStorage key (default: 'student_progress')
});
```

## Requirements Satisfied

- **Requirement 3.5**: Progress persists and restores on return
- **Requirement 13.1**: Automatic save after each step
- **Requirement 13.2**: Backend persistence within 5 seconds (500ms debounce)
- **Requirement 13.3**: Complete progress state restoration

## Testing

```typescript
// Test optimistic updates
const tracker = new ProgressTracker('test-student');
tracker.markStepComplete('linear_regression', WorkflowStep.Theory);

// Verify localStorage updated immediately
const stored = localStorage.getItem('student_progress');
expect(stored).toBeDefined();

// Test rollback on failure
const failingSync = async () => { throw new Error('Network error'); };
const tracker2 = new ProgressTracker('test-student', failingSync);

// Mark step complete
tracker2.markStepComplete('linear_regression', WorkflowStep.Theory);

// Wait for sync attempt and rollback
await new Promise(resolve => setTimeout(resolve, 600));

// Verify rollback occurred
const progress = tracker2.getAlgorithmProgress('linear_regression');
expect(progress?.completedSteps).toHaveLength(0);
```

## Best Practices

1. **Always provide sync callback** in production
2. **Call cleanup()** when component unmounts
3. **Handle sync errors** gracefully in UI
4. **Use forceSyncNow()** before critical operations (e.g., logout)
5. **Test rollback scenarios** to ensure data integrity

## Error Handling

```typescript
// Sync errors are logged but don't throw
tracker.markStepComplete('linear_regression', WorkflowStep.Theory);
// If sync fails, error is logged to console

// Force sync can throw
try {
  await tracker.syncProgress();
} catch (error) {
  console.error('Failed to sync:', error);
  // Show error message to user
}
```
