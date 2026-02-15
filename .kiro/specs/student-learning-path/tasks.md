# Implementation Plan: Student Learning Path

## Overview

This implementation plan breaks down the Student Learning Path feature into incremental, testable tasks. The approach follows a bottom-up strategy: building core data structures and logic first, then adding UI components, and finally integrating everything into a cohesive user experience. Each task builds on previous work, ensuring no orphaned code.

The implementation uses TypeScript with React/Next.js on the frontend and Python FastAPI on the backend, following the existing application architecture.

## Tasks

- [x] 1. Set up data models and type definitions
  - Create TypeScript interfaces for all data models (Algorithm, Progress, Achievement, etc.)
  - Define enums for difficulty levels, mastery status, and workflow steps
  - Create algorithm configuration with prerequisite relationships
  - Set up JSON schemas for data validation
  - _Requirements: 1.1, 3.1, 8.2, 15.1_

- [~] 1.1 Write property test for algorithm configuration
  - **Property 1: Algorithm Difficulty Organization**
  - **Validates: Requirements 1.1**

- [ ] 2. Implement Progress Tracker core logic
  - [x] 2.1 Create ProgressTracker class with step completion methods
    - Implement markStepComplete, isStepComplete, getStepProgress
    - Implement algorithm-level progress calculation
    - Implement overall progress calculation
    - _Requirements: 3.1, 3.2, 3.3, 3.6_

  - [~] 2.2 Write property tests for progress tracking
    - **Property 9: Step Completion Recording**
    - **Property 10: Algorithm Completion Percentage Calculation**
    - **Property 11: Overall Progress Calculation**
    - **Property 13: Algorithm Status Transition on Completion**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.6**

  - [x] 2.3 Implement progress persistence layer
    - Create localStorage adapter for immediate caching
    - Implement debounced backend sync (500ms)
    - Add optimistic updates with rollback on failure
    - _Requirements: 3.5, 13.1, 13.2, 13.3_

  - [~] 2.4 Write property tests for persistence
    - **Property 12: Progress Persistence Round-Trip**
    - **Property 45: Automatic Progress Save on Step Completion**
    - **Property 46: Progress Persistence Time Bound**
    - **Validates: Requirements 3.5, 13.1, 13.2, 13.3**

- [ ] 3. Implement Prerequisite Engine
  - [x] 3.1 Create PrerequisiteEngine class with validation logic
    - Implement prerequisite configuration loading
    - Implement arePrerequisitesMet validation
    - Implement getMissingPrerequisites method
    - Create dependency graph builder
    - _Requirements: 1.2, 4.1, 4.4_

  - [~] 3.2 Write property tests for prerequisite validation
    - **Property 2: Prerequisite Validation on Access**
    - **Property 3: Locked Algorithm Navigation Prevention**
    - **Property 14: Automatic Algorithm Unlocking**
    - **Validates: Requirements 1.2, 1.3, 4.4**

  - [x] 3.3 Implement unlock notification system
    - Create checkForNewUnlocks method
    - Integrate with Progress Tracker for real-time validation
    - _Requirements: 4.4_

  - [~] 3.4 Write property test for difficulty level unlocking
    - **Property 4: Difficulty Level Unlocking**
    - **Validates: Requirements 1.4**

- [ ] 4. Implement Learning Path Manager
  - [x] 4.1 Create LearningPathManager class
    - Implement isAlgorithmUnlocked method
    - Implement canNavigateToAlgorithm with navigation guards
    - Implement getAlgorithmsByDifficulty
    - Integrate with PrerequisiteEngine and ProgressTracker
    - _Requirements: 1.2, 1.3, 1.4, 1.5_

  - [~] 4.2 Write property tests for learning path management
    - **Property 5: Completed Algorithm Accessibility**
    - **Validates: Requirements 1.5**

  - [~] 4.3 Write unit tests for navigation guards
    - Test locked algorithm access prevention
    - Test unlocked algorithm access allowance
    - Test completed algorithm revisit
    - _Requirements: 1.2, 1.3, 1.5_

- [~] 5. Checkpoint - Core logic validation
  - Ensure all tests pass for Progress Tracker, Prerequisite Engine, and Learning Path Manager
  - Verify prerequisite relationships work correctly
  - Ask the user if questions arise

- [ ] 6. Implement Recommendation Engine
  - [x] 6.1 Create RecommendationEngine class
    - Implement getNextRecommendation with priority logic
    - Implement getSuggestedAlgorithms
    - Implement recommendation reasoning generation
    - Add adaptive difficulty suggestions based on performance
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 12.2, 12.3_

  - [~] 6.2 Write property tests for recommendations
    - **Property 16: Recommendation Validity**
    - **Property 17: Recommendation Prioritization**
    - **Property 18: Post-Completion Recommendation**
    - **Property 19: Recommendation Reasoning Completeness**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.5**

  - [~] 6.3 Write property tests for adaptive recommendations
    - **Property 42: High Performance Advanced Suggestions**
    - **Property 43: Low Performance Review Suggestions**
    - **Validates: Requirements 12.2, 12.3**

- [ ] 7. Implement Achievement System
  - [x] 7.1 Create AchievementSystem class
    - Define achievement configurations (badges, points, unlock conditions)
    - Implement checkForNewAchievements method
    - Implement awardAchievement with point tracking
    - Implement streak calculation logic
    - _Requirements: 8.1, 8.2, 8.3, 8.5_

  - [~] 7.2 Write property tests for achievements
    - **Property 28: Level Completion Badge Award**
    - **Property 29: Achievement Points Accumulation**
    - **Property 30: Achievement Notification on Earn**
    - **Validates: Requirements 8.2, 8.3, 8.5**

  - [~] 7.3 Implement certificate generation
    - Create certificate data structure with unique IDs
    - Implement generateCertificate for difficulty levels
    - Add certificate download URL generation
    - Add shareable certificate links
    - _Requirements: 15.1, 15.2, 15.3, 15.5_

  - [~] 7.4 Write property tests for certificates
    - **Property 53: Certificate Generation on Level Completion**
    - **Property 54: Certificate PDF Download**
    - **Property 56: Certificate Share Link Inclusion**
    - **Validates: Requirements 15.1, 15.2, 15.5**

- [ ] 8. Implement Skill Assessment Manager
  - [x] 8.1 Create SkillAssessmentManager class
    - Load challenge definitions from JSON configuration
    - Implement submitChallengeResponse with validation
    - Implement performance tracking and scoring
    - Add hint system for failed attempts
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 12.1_

  - [~] 8.2 Write property tests for skill assessment
    - **Property 24: Challenge Presentation on Algorithm Completion**
    - **Property 25: Mastery Status on Challenge Success**
    - **Property 26: Challenge Retry on Failure**
    - **Property 41: Performance Metric Tracking**
    - **Validates: Requirements 7.1, 7.3, 7.4, 12.1**

  - [~] 8.3 Write property test for challenge unlock requirement
    - **Property 27: Challenge Completion Requirement for Level Unlock**
    - **Validates: Requirements 7.5**

- [ ] 9. Implement React Context for state management
  - [~] 9.1 Create LearningPathContext
    - Set up React Context with all core managers (ProgressTracker, LearningPathManager, etc.)
    - Implement context provider component
    - Add localStorage sync on context updates
    - Implement useProgress, useRecommendations, useAchievements hooks
    - _Requirements: 3.1, 3.5, 13.1_

  - [~] 9.2 Write integration tests for context
    - Test context provider initialization
    - Test hook updates trigger re-renders
    - Test localStorage sync on state changes
    - _Requirements: 3.5, 13.1_

- [~] 10. Checkpoint - Backend integration preparation
  - Ensure all core logic and state management tests pass
  - Verify context hooks work correctly
  - Ask the user if questions arise

- [ ] 11. Implement backend API endpoints
  - [x] 11.1 Create progress API endpoints (Python FastAPI)
    - POST /api/progress/save - Save progress data
    - GET /api/progress/load - Load progress data
    - POST /api/progress/sync - Sync progress updates
    - Add authentication middleware
    - _Requirements: 13.2, 13.3_

  - [x] 11.2 Create achievement API endpoints
    - GET /api/achievements - Get all achievements
    - POST /api/achievements/award - Award achievement
    - GET /api/certificates - Get earned certificates
    - POST /api/certificates/generate - Generate certificate
    - _Requirements: 8.2, 15.1_

  - [x] 11.3 Create challenge API endpoints
    - GET /api/challenges/:algorithmId - Get challenge for algorithm
    - POST /api/challenges/submit - Submit challenge response
    - GET /api/challenges/history - Get challenge attempt history
    - _Requirements: 7.1, 7.2_

  - [~] 11.4 Write API integration tests
    - Test progress save and load round-trip
    - Test achievement award and retrieval
    - Test challenge submission and validation
    - _Requirements: 13.3, 8.2, 7.2_

- [ ] 12. Implement Onboarding Flow components
  - [x] 12.1 Create OnboardingModal component
    - Build modal overlay with tutorial steps
    - Implement step navigation (next, previous, skip)
    - Add element highlighting with spotlight effect
    - Implement tooltip positioning logic
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 12.2 Create OnboardingFlowManager
    - Define onboarding step configuration
    - Implement step progression logic
    - Add onboarding completion tracking
    - Integrate with LearningPathContext
    - _Requirements: 2.1, 2.5, 2.6_

  - [~] 12.3 Write property tests for onboarding
    - **Property 6: Onboarding Tutorial Content Completeness**
    - **Property 7: Tutorial Skip and Pause Functionality**
    - **Property 8: Onboarding Completion Idempotence**
    - **Validates: Requirements 2.2, 2.4, 2.5**

  - [~] 12.4 Write unit tests for onboarding UI
    - Test modal renders with correct steps
    - Test skip button functionality
    - Test completion marks user as onboarded
    - _Requirements: 2.1, 2.4, 2.5_

- [ ] 13. Implement Learning Dashboard page
  - [x] 13.1 Create Dashboard page component (/dashboard route)
    - Build overall progress circular indicator
    - Add "Continue Learning" card with next recommendation
    - Display learning statistics (algorithms completed, streak, time)
    - Show recent activity feed
    - _Requirements: 9.1, 9.3, 9.4, 9.6_

  - [x] 13.2 Create AlgorithmProgressGrid component
    - Display algorithms grouped by difficulty level
    - Show progress bars for each algorithm
    - Add visual state indicators (locked, in-progress, completed, mastered)
    - Implement navigation to algorithm pages
    - _Requirements: 9.2, 9.5, 11.1, 11.4_

  - [x] 13.3 Create AchievementDisplay component
    - Display earned badges with icons and titles
    - Show locked badges with unlock requirements
    - Add achievement points total
    - Implement achievement modal with details
    - _Requirements: 8.4, 8.5_

  - [~] 13.4 Write property tests for dashboard
    - **Property 31: Dashboard Algorithm Organization**
    - **Property 32: Dashboard Recent Activity Inclusion**
    - **Property 33: In-Progress Algorithm Navigation**
    - **Validates: Requirements 9.2, 9.4, 9.5**

  - [~] 13.5 Write unit tests for dashboard components
    - Test dashboard renders with mock data
    - Test continue learning button navigation
    - Test algorithm grid grouping
    - Test achievement display
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 14. Implement algorithm page enhancements
  - [x] 14.1 Add workflow step navigation component
    - Display 6-step progress indicator
    - Highlight current active step
    - Show completion checkmarks for completed steps
    - Implement step navigation (next, previous)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [~] 14.2 Write property tests for step navigation
    - **Property 20: Workflow Step Ordering**
    - **Property 21: Step Advancement on Completion**
    - **Property 22: Backward Navigation Allowance**
    - **Property 23: Step Progress Indicator Accuracy**
    - **Validates: Requirements 6.1, 6.3, 6.4, 6.5**

  - [x] 14.3 Add algorithm lock overlay for locked algorithms
    - Create lock overlay component with prerequisite list
    - Display missing prerequisites with links
    - Add visual lock icon and messaging
    - Integrate with PrerequisiteEngine
    - _Requirements: 1.3, 4.2_

  - [~] 14.4 Write unit tests for lock overlay
    - Test overlay displays for locked algorithms
    - Test prerequisite list accuracy
    - Test overlay hidden for unlocked algorithms
    - _Requirements: 1.3, 4.2_

- [~] 15. Checkpoint - UI components validation
  - Ensure all dashboard and algorithm page components render correctly
  - Verify navigation between components works
  - Test responsive design on mobile and desktop
  - Ask the user if questions arise

- [ ] 16. Implement practice challenge components
  - [x] 16.1 Create ChallengeModal component
    - Build modal for displaying challenges
    - Add multiple choice question rendering
    - Implement answer submission
    - Display immediate feedback and explanations
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [~] 16.2 Add hint system to challenge modal
    - Display hints on failed attempts
    - Implement progressive hint revelation
    - Add retry button with hint access
    - _Requirements: 7.4_

  - [~] 16.3 Write unit tests for challenge components
    - Test challenge modal renders correctly
    - Test answer submission and feedback
    - Test hint display on failure
    - Test retry functionality
    - _Requirements: 7.1, 7.2, 7.4_

- [ ] 17. Implement tooltip and help system
  - [~] 17.1 Create Tooltip component
    - Build reusable tooltip with positioning logic
    - Add hover and focus trigger support
    - Implement accessibility (ARIA labels, keyboard navigation)
    - _Requirements: 10.1_

  - [~] 17.2 Create HelpIcon component
    - Build help icon with expandable explanations
    - Add visual diagrams and examples support
    - Implement click/tap to expand functionality
    - _Requirements: 10.2, 10.4_

  - [~] 17.3 Add beginner mode explanation system
    - Implement simplified vs advanced explanation toggle
    - Set default mode based on algorithm difficulty
    - Add user preference for explanation complexity
    - _Requirements: 10.3_

  - [~] 17.4 Write property tests for tooltips and help
    - **Property 34: Technical Term Tooltip Presence**
    - **Property 35: Help Icon Presence for Complex Concepts**
    - **Property 36: Beginner Explanation Simplification**
    - **Property 37: Explanation Visual Content Inclusion**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4**

- [ ] 18. Implement glossary system
  - [~] 18.1 Create Glossary page component
    - Build searchable glossary with all ML terms
    - Add alphabetical navigation
    - Implement term definitions with examples
    - _Requirements: 10.5_

  - [~] 18.2 Add glossary link to navigation
    - Update Layout component with glossary link
    - Ensure link present on all pages
    - _Requirements: 10.5_

  - [~] 18.3 Write property test for glossary accessibility
    - **Property 38: Glossary Universal Accessibility**
    - **Validates: Requirements 10.5**

- [ ] 19. Implement visual progress indicators
  - [x] 19.1 Create ProgressBar component
    - Build reusable progress bar with percentage display
    - Add color coding for different states
    - Implement smooth animation on updates
    - _Requirements: 11.1, 11.5_

  - [x] 19.2 Create MiniProgressIndicator component
    - Build compact progress indicator for list items
    - Add visual state icons (lock, checkmark, star)
    - Implement color coding (gray, blue, green, gold)
    - _Requirements: 11.2, 11.4, 11.5_

  - [x] 19.3 Create CircularProgress component for dashboard
    - Build circular progress indicator with percentage
    - Add animated progress arc
    - Implement responsive sizing
    - _Requirements: 9.1, 11.3_

  - [~] 19.4 Write property tests for progress indicators
    - **Property 39: Algorithm Progress Bar Presence**
    - **Property 40: Mini Progress Indicator in Algorithm Lists**
    - **Property 15: Visual State Differentiation**
    - **Validates: Requirements 11.1, 11.4, 4.5, 11.2, 11.5**

- [ ] 20. Implement dependency visualization
  - [~] 20.1 Create DependencyGraph component
    - Build interactive graph visualization using D3.js or similar
    - Render algorithm nodes with status indicators
    - Draw edges between prerequisites and dependents
    - Implement zoom and pan controls
    - _Requirements: 14.1, 14.2, 14.5_

  - [~] 20.2 Add node interaction to dependency graph
    - Implement click handler for algorithm nodes
    - Display algorithm details modal on click
    - Highlight completed path in graph
    - _Requirements: 14.3, 14.4_

  - [~] 20.3 Write property tests for dependency visualization
    - **Property 49: Dependency Graph Edge Representation**
    - **Property 50: Algorithm Node Interaction**
    - **Property 51: Completed Path Highlighting**
    - **Property 52: Dependency Map Zoom and Pan**
    - **Validates: Requirements 14.2, 14.3, 14.4, 14.5**

- [~] 21. Checkpoint - Visual components validation
  - Ensure all progress indicators render correctly
  - Verify dependency graph displays and interactions work
  - Test tooltips and help system
  - Ask the user if questions arise

- [ ] 22. Implement certificate generation and display
  - [~] 22.1 Create Certificate component
    - Build certificate template with student name, date, level
    - Add unique certificate number generation
    - Implement PDF export using browser print API or jsPDF
    - _Requirements: 15.1, 15.2_

  - [~] 22.2 Create CertificateGallery component
    - Display all earned certificates in dashboard
    - Add download button for each certificate
    - Implement shareable link generation
    - Add social media share buttons
    - _Requirements: 15.4, 15.5_

  - [~] 22.3 Write property tests for certificates
    - **Property 55: Certificate Dashboard Display**
    - **Validates: Requirements 15.4**

  - [~] 22.4 Write unit tests for certificate components
    - Test certificate generation with correct data
    - Test PDF download functionality
    - Test share link generation
    - _Requirements: 15.1, 15.2, 15.5_

- [ ] 23. Implement offline support and sync
  - [~] 23.1 Add offline detection
    - Implement online/offline event listeners
    - Display offline indicator in UI
    - Queue progress updates when offline
    - _Requirements: 13.4_

  - [~] 23.2 Implement sync queue and conflict resolution
    - Create sync queue for offline updates
    - Implement automatic sync on reconnection
    - Add conflict resolution using timestamp comparison
    - Implement exponential backoff for failed syncs
    - _Requirements: 13.4, 13.5_

  - [~] 23.3 Write property tests for offline support
    - **Property 47: Offline Progress Queueing**
    - **Property 48: Sync Conflict Resolution**
    - **Validates: Requirements 13.4, 13.5**

  - [~] 23.4 Write integration tests for sync
    - Test offline queue accumulation
    - Test sync on reconnection
    - Test conflict resolution with concurrent updates
    - _Requirements: 13.4, 13.5_

- [ ] 24. Implement notification system
  - [~] 24.1 Create NotificationManager
    - Build notification queue and display logic
    - Implement toast notifications for achievements
    - Add celebratory animations for badges
    - Implement notification persistence (don't show again)
    - _Requirements: 8.5, 4.4_

  - [~] 24.2 Create Toast component
    - Build toast notification with auto-dismiss
    - Add different styles for success, info, warning, error
    - Implement stacking for multiple notifications
    - Add accessibility announcements
    - _Requirements: 8.5_

  - [~] 24.3 Write unit tests for notifications
    - Test toast displays on achievement earn
    - Test notification queue management
    - Test auto-dismiss timing
    - _Requirements: 8.5_

- [ ] 25. Implement error handling and recovery
  - [~] 25.1 Add error boundary components
    - Create ErrorBoundary for React error catching
    - Implement fallback UI for errors
    - Add error logging to backend
    - _Requirements: All (error handling)_

  - [~] 25.2 Implement network error handling
    - Add retry logic with exponential backoff
    - Display user-friendly error messages
    - Implement graceful degradation for offline mode
    - _Requirements: 13.4_

  - [~] 25.3 Add data validation and recovery
    - Implement progress data schema validation
    - Add data repair for corrupted state
    - Create backup and restore functionality
    - _Requirements: 3.5, 13.3_

  - [~] 25.4 Write unit tests for error handling
    - Test error boundary catches errors
    - Test retry logic with mock failures
    - Test data validation and repair
    - _Requirements: All (error handling)_

- [ ] 26. Implement user preferences and settings
  - [~] 26.1 Create Settings page
    - Add difficulty preference controls
    - Add explanation complexity toggle
    - Add "Restart Tutorial" button
    - Implement preference persistence
    - _Requirements: 2.6, 10.3, 12.4_

  - [~] 26.2 Write property test for preference persistence
    - **Property 44: Difficulty Preference Persistence**
    - **Validates: Requirements 12.4**

- [ ] 27. Update homepage with learning path integration
  - [~] 27.1 Modify homepage algorithm grid
    - Add lock indicators for locked algorithms
    - Add progress indicators to algorithm cards
    - Update hover states to show prerequisite info
    - Integrate with LearningPathContext
    - _Requirements: 1.3, 4.5, 11.1_

  - [~] 27.2 Add dashboard link to homepage
    - Add prominent "My Dashboard" button to header
    - Add dashboard preview section to homepage
    - _Requirements: 9.1_

  - [~] 27.3 Write integration tests for homepage
    - Test locked algorithms display correctly
    - Test progress indicators show on cards
    - Test navigation to dashboard
    - _Requirements: 1.3, 4.5, 9.1_

- [~] 28. Checkpoint - Full feature integration
  - Ensure all components integrate correctly
  - Test complete user journeys end-to-end
  - Verify all progress tracking and persistence works
  - Ask the user if questions arise

- [ ] 29. Implement analytics and monitoring
  - [~] 29.1 Add analytics tracking
    - Track algorithm completions
    - Track challenge attempts and success rates
    - Track time spent per algorithm
    - Track streak maintenance
    - _Requirements: 9.6, 12.1_

  - [~] 29.2 Add error monitoring
    - Integrate error tracking service (e.g., Sentry)
    - Track sync failures and conflicts
    - Monitor API error rates
    - _Requirements: All (monitoring)_

- [ ] 30. Accessibility audit and improvements
  - [~] 30.1 Run automated accessibility tests
    - Use axe-core to scan all pages
    - Fix all critical and serious violations
    - Ensure WCAG 2.1 AA compliance
    - _Requirements: All (accessibility)_

  - [~] 30.2 Manual accessibility testing
    - Test keyboard navigation on all pages
    - Test with screen reader (NVDA or JAWS)
    - Verify focus management in modals
    - Test color contrast ratios
    - _Requirements: All (accessibility)_

- [ ] 31. Performance optimization
  - [~] 31.1 Optimize dashboard load time
    - Implement code splitting for dashboard
    - Add skeleton loaders for async data
    - Optimize progress calculation algorithms
    - Target < 1 second load time
    - _Requirements: 9.1_

  - [~] 31.2 Optimize dependency graph rendering
    - Implement virtualization for large graphs
    - Optimize D3.js rendering performance
    - Add loading states
    - Target < 2 seconds render time
    - _Requirements: 14.1_

- [ ] 32. Write end-to-end tests
  - [~] 32.1 E2E test: Complete onboarding flow
    - Test first-time user onboarding from start to finish
    - Verify all tutorial steps display correctly
    - Test skip and complete functionality
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [~] 32.2 E2E test: Complete first algorithm
    - Test navigating to first algorithm
    - Test completing all 6 workflow steps
    - Test challenge completion
    - Verify achievement awarded
    - _Requirements: 3.1, 6.1, 7.1, 8.1_

  - [~] 32.3 E2E test: Unlock intermediate level
    - Test completing all beginner algorithms
    - Verify intermediate algorithms unlock
    - Test navigation to intermediate algorithm
    - _Requirements: 1.4, 4.4_

  - [~] 32.4 E2E test: Generate certificate
    - Test completing all algorithms in a difficulty level
    - Verify certificate generation
    - Test certificate download
    - _Requirements: 15.1, 15.2_

- [ ] 33. Documentation and code cleanup
  - [~] 33.1 Write component documentation
    - Add JSDoc comments to all components
    - Document props and usage examples
    - Create Storybook stories for key components
    - _Requirements: All_

  - [~] 33.2 Write API documentation
    - Document all backend endpoints
    - Add request/response examples
    - Create Postman collection
    - _Requirements: 11.1, 11.2, 11.3_

  - [~] 33.3 Code cleanup and refactoring
    - Remove unused code and imports
    - Standardize naming conventions
    - Extract magic numbers to constants
    - Add TODO comments for future enhancements
    - _Requirements: All_

- [~] 34. Final checkpoint - Feature complete
  - Run all tests (unit, property, integration, E2E)
  - Verify all requirements are implemented
  - Test on multiple browsers and devices
  - Ensure all documentation is complete
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and allow for course correction
- Property tests validate universal correctness properties (minimum 100 iterations each)
- Unit tests validate specific examples, edge cases, and error conditions
- Integration and E2E tests validate complete user workflows
- The implementation follows a bottom-up approach: data models → core logic → state management → UI components → integration
- All components should be built with accessibility in mind from the start
- Performance optimization tasks are marked optional but recommended for production
