# CrowdCompute Workbench Implementation Guide

## Overview

This guide provides a complete implementation of the CrowdCompute Workbench as a fully functional, dynamic page within your Next.js application. The implementation faithfully replicates the Google-style UI while integrating with your existing state management system.

## Project Structure

```
src/
├── app/
│   └── (private)/
│       └── workbench/
│           ├── page.tsx                    # Main workbench page
│           └── workbench.module.css        # Page-level styles
├── components/
│   └── workbench/
│       ├── WorkbenchHeader.tsx             # Top navigation bar
│       ├── WorkbenchHeader.module.css
│       ├── WorkbenchToolbar.tsx            # Action buttons toolbar
│       ├── WorkbenchToolbar.module.css
│       ├── TaskInstructions.tsx            # Side panel instructions
│       ├── TaskInstructions.module.css
│       ├── WorkArea.tsx                    # Main iframe container
│       ├── WorkArea.module.css
│       ├── LoadingOverlay.tsx              # Loading state overlay
│       └── LoadingOverlay.module.css
├── store/
│   └── taskStore.ts                        # Updated Zustand store
└── app/
    └── (public)/
        └── task-plugin/
            └── response-rating/
                ├── page.tsx                # Example task plugin
                └── response-rating.module.css
```

## Key Features Implemented

### 1. **Pixel-Perfect UI Replication**
- Google-style header with account menu
- Material Design-inspired toolbar with all action buttons
- Timer display and question counter
- Disabled states with informative tooltips
- Dropdown menus for additional actions
- Loading states and animations

### 2. **Shell + Iframe Architecture**
- Main workbench acts as a persistent shell
- Tasks load in an isolated iframe for security and modularity
- Cross-iframe communication via postMessage API
- Reload plugin functionality

### 3. **Dynamic State Management**
- Integration with Zustand store for state management
- Session timer that updates every second
- Task completion and parking counters
- Conditional button states based on business logic

### 4. **Responsive Design**
- Flexbox-based layout system
- Custom scrollbars matching Google's design
- Proper overflow handling
- Mobile-responsive considerations

## Implementation Steps

### Step 1: Install Dependencies

No additional dependencies are required beyond what's already in your Next.js project. The implementation uses:
- React hooks for state management
- Zustand (already installed) for global state
- CSS Modules for styling

### Step 2: Update the Task Store

Replace your existing `src/store/taskStore.ts` with the updated version provided. This includes:
- Proper TypeScript interfaces for tasks
- Session management functionality
- API integration methods

### Step 3: Create Component Files

Create all the component files in the `src/components/workbench/` directory as provided in the artifacts above.

### Step 4: Add the Workbench Page

Create the main page file at `src/app/(private)/workbench/page.tsx`.

### Step 5: Create Task Plugin Route

For the iframe content, create a new public route at `src/app/(public)/task-plugin/response-rating/page.tsx`. This demonstrates how task plugins work.

### Step 6: Add Custom Fonts

Add Google Fonts to your `app/layout.tsx`:

```tsx
<link
  href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&family=Roboto:wght@300;400;500&display=swap"
  rel="stylesheet"
/>
```

### Step 7: Update API Routes

Create or update the following API endpoints:

```typescript
// src/app/api/tasks/next/route.ts
export async function GET() {
  // Fetch next available task from Google Sheets
}

// src/app/api/tasks/submit/route.ts
export async function POST(request: Request) {
  // Submit task completion
}

// src/app/api/tasks/park/route.ts
export async function POST(request: Request) {
  // Park task for later
}
```

## Customization Points

### 1. **Task Plugin Development**
- Each task type should be a separate Next.js route
- Use the provided response-rating example as a template
- Implement postMessage communication for task submission

### 2. **Styling Adjustments**
- All colors and dimensions are defined in CSS modules
- Update the color scheme by modifying CSS variables
- Icons are inline SVGs and can be easily replaced

### 3. **Business Logic**
- Modify the `canCompleteSession` logic in the main page
- Adjust the question availability counter logic
- Customize the session timer behavior

## Security Considerations

1. **Iframe Sandboxing**: The implementation uses `sandbox` attributes to restrict iframe capabilities
2. **Origin Verification**: The postMessage handler verifies the origin of messages
3. **No Direct DOM Access**: The iframe and parent communicate only through messages

## Testing Recommendations

1. **Component Testing**: Test each component in isolation
2. **Integration Testing**: Test the iframe communication flow
3. **State Management**: Verify Zustand store updates correctly
4. **Responsive Testing**: Test on various screen sizes
5. **Cross-Browser Testing**: Ensure compatibility with Chrome, Firefox, Safari

## Deployment Checklist

- [ ] Update environment variables for API endpoints
- [ ] Configure authentication middleware for the /workbench route
- [ ] Set up proper CORS headers for iframe content
- [ ] Test the Google Sheets integration
- [ ] Implement proper error handling and logging
- [ ] Add analytics tracking for user actions
- [ ] Set up monitoring for session management

## Next Steps

1. Implement real task data fetching from your backend
2. Add more task plugin types beyond response-rating
3. Implement the parking lot feature to view parked tasks
4. Add the analytics dashboard
5. Implement session persistence across page reloads

This implementation provides a solid foundation that matches the original CrowdCompute Workbench while being fully integrated with your Next.js application architecture.