# Hosted Site Public URL
https://indus-student-dashboard.netlify.app/

# Student Personalised Learning Pathway

A React TypeScript application that visualizes student learning data across multiple subjects, showing performance metrics, progress tracking, and personalized recommendations.

## Features

- **Dashboard View**: Overview of student information with overall descriptive and prescriptive analysis
- **Subject Navigation**: Right rail with subject buttons showing current scores
- **Subject Detail View**: Deep dive into individual subject performance with:
  - EOL/FA/SA assessment tiles with task counts and percentages
  - Visual progress chart showing current vs predicted scores
  - Grade thresholds and improvement guidance
  - Weak/strong topic analysis
  - Subject-specific descriptive and prescriptive content
- **Responsive Design**: Desktop-first with tablet breakpoint support
- **Accessibility**: Semantic HTML, ARIA labels, focus management

## Tech Stack

- **React 19** with TypeScript
- **React Router v7** for client-side routing
- **Vite** for build tooling
- **Vitest** + React Testing Library for unit testing
- CSS Modules for styling

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests once (CI)
npm run test:run
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AssessmentTile.tsx    # EOL/FA/SA score tiles
│   ├── InfoBox.tsx           # Descriptive/Prescriptive content boxes
│   ├── ProgressChart.tsx     # Score visualization with grade thresholds
│   ├── StudentCard.tsx       # Student info card
│   └── SubjectButton.tsx     # Subject navigation buttons
├── hooks/
│   └── useStudentData.ts     # Data fetching hook
├── pages/
│   ├── Dashboard.tsx         # Main overview page
│   └── SubjectDetail.tsx     # Subject-specific detail page
├── types/
│   └── index.ts              # TypeScript interfaces
├── test/
│   └── setup.ts              # Vitest setup
├── App.tsx                   # Router configuration
└── main.tsx                  # Application entry point
```

## Data

The application loads student data from `/grade8a.json` in the public folder. The data structure includes:

- Student identification (username, grade)
- Per-subject test results (base, EOL, FA, SA)
- Performance metrics (scores, percentages, counts)
- Weak/strong topic analysis
- AI-generated descriptive and prescriptive feedback

## Architectural Decisions

1. **Single JSON Load**: Data is fetched once and shared via hook state. For a larger app, consider React Context or state management library.

2. **CSS-in-file**: Each component has a co-located CSS file for maintainability. No CSS-in-JS to keep bundle size minimal.

3. **No External UI Library**: Custom components to demonstrate implementation skills and keep dependencies minimal.

4. **Grade Thresholds**: Hardcoded thresholds (A=90, B=75, C=60, D=40) for progress visualization. In production, these could be configurable.

5. **First Student Default**: App defaults to the first student in the array. In production, this would be tied to authentication.

## Trade-offs

- **No State Management**: Simple useState/useEffect for this scope. Would add Zustand/Redux for complex state.
- **No Error Boundaries**: Added basic error states but no React Error Boundaries.
- **Limited Test Coverage**: One component tested as requested. Production would have full coverage.
- **No i18n**: English-only. Would add react-intl for internationalization.
- **No Dark Mode**: Light theme only for scope management.

## Deployment

Build the production bundle:

```bash
npm run build
```

The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
