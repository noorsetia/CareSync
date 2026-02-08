# Healthcare Patient Portal

A production-grade healthcare patient portal built with modern React best practices.

## Tech Stack

- **React 19** with Vite for fast development
- **React Router v7** for declarative routing
- **TanStack React Query v5** for server state management and caching
- **Context API** for authentication state
- Functional components only
- Accessibility-first design (ARIA labels, semantic HTML, keyboard navigation)

## Features

- ✅ Secure authentication flow with session persistence
- ✅ Protected routes with automatic redirect
- ✅ Mock API with simulated network latency
- ✅ React Query data fetching with retry logic
- ✅ Accessible forms and navigation
- ✅ Professional, healthcare-appropriate UI
- ✅ ESLint with React Fast Refresh rules
- ✅ Clean, beginner-friendly code structure

## Project Structure

**Scalable folder structure for production applications.** See [FOLDER_GUIDE.md](./FOLDER_GUIDE.md) for detailed explanations.

```
src/
├── api/                       # API layer & React Query logic
│   ├── queries/              # React Query hooks for GET requests
│   ├── mutations/            # React Query hooks for POST/PUT/DELETE
│   └── mockApi.js            # Mock endpoints for development
│
├── components/               # Reusable UI components
│   ├── common/              # Generic components (Button, Card, Modal)
│   ├── appointments/        # Appointment-specific components
│   └── records/             # Medical records components
│
├── context/                  # Global state (Context API)
│   ├── authContextCore.js   # Auth context object
│   ├── AuthContext.jsx      # Auth provider
│   └── useAuth.js           # Auth hook
│
├── hooks/                    # Custom React hooks
│   ├── useDebounce.js       # Debounce hook for search
│   └── useLocalStorage.js   # Sync state with localStorage
│
├── layouts/                  # Page layout wrappers
│   └── DashboardLayout.jsx  # Dashboard with sidebar nav
│
├── pages/                    # Route-level components
│   ├── LoginPage.jsx        # /login
│   ├── DashboardPage.jsx    # /dashboard
│   └── AppointmentsPage.jsx # /dashboard/appointments
│
├── utils/                    # Pure helper functions
│   ├── formatters.js        # Format dates, times, phone
│   └── validators.js        # Input validation
│
├── App.jsx                   # Main app with routes
├── main.jsx                  # Entry point with providers
└── App.css                   # Global styles
```

**📚 Documentation:**
- [FOLDER_GUIDE.md](./FOLDER_GUIDE.md) - Detailed folder responsibilities
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Visual diagrams and patterns
- [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) - Complete architecture guide

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or next available port).

### Demo Credentials

- **Email:** `patient@example.com`
- **Password:** `password123`

## Development

### Linting

```bash
npm run lint
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Code Quality & Best Practices

- ✅ **Controlled components** for all form inputs
- ✅ **Semantic HTML** (section, article, nav, etc.)
- ✅ **Small, focused components** following single responsibility
- ✅ **Clear comments** explaining WHY, not just WHAT
- ✅ **Accessibility-first** with ARIA attributes and keyboard support
- ✅ **No class components** - functional components only
- ✅ **ESLint compliance** with React hooks and fast refresh rules

## Architecture Decisions

### Authentication

- Uses Context API for global auth state
- Session persisted in `localStorage` for demo purposes
- In production, use httpOnly cookies and refresh tokens

### Data Fetching

- React Query handles caching, retries, and background refetching
- Conservative retry strategy (1 retry) appropriate for healthcare
- Short stale time (1 minute) to balance UX and data freshness

### Routing

- React Router v7 with protected route pattern
- Preserves attempted destination in location state for post-login redirect
- Centralized navigation logic in AuthProvider

## Next Steps (Production Readiness)

1. **Testing**
   - Add unit tests (Vitest + React Testing Library)
   - Add E2E tests (Playwright)
   - Test accessibility with axe-core

2. **Security**
   - Replace localStorage with httpOnly cookies
   - Add CSRF protection
   - Implement proper token refresh flow
   - Add rate limiting

3. **UX Enhancements**
   - Add loading skeletons
   - Add error boundaries
   - Add toast notifications
   - Add form validation with detailed feedback

4. **Design System**
   - Extract design tokens to CSS variables
   - Add dark mode support
   - Create component library
   - Add responsive breakpoints

5. **Performance**
   - Add code splitting
   - Optimize bundle size
   - Add service worker for offline support
   - Implement virtualization for large lists

## License

MIT
