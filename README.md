# **Alias**

A modern web application for managing Discord server nicknames at scale. Alias provides server administrators with an intuitive interface to organize, batch-update, and manage member nicknames across their Discord communities using themed nickname groups called "Arcs."

## Overview

Discord server management becomes challenging as communities grow. Alias addresses this by providing a centralized platform where administrators can:

- View and manage all server members in a single interface
- Create themed nickname groups ("Arcs") for events, seasons, or campaigns
- Apply bulk nickname changes across multiple members simultaneously
- Maintain different nickname sets and switch between them seamlessly
- Track member roles and permissions alongside nickname management

## Tech Stack

Alias showcases modern full-stack development practices with cutting-edge technologies:

### Frontend
- **Next.js 15** with App Router and React Server Components
- **React 19** leveraging the latest concurrent features
- **TypeScript** for type-safe development
- **Tailwind CSS 4.0** with custom design system
- **Motion** for fluid animations and micro-interactions
- **Radix UI** for accessible component primitives
- **TanStack Query** for sophisticated server state management

### Backend & Infrastructure
- **Supabase** for PostgreSQL database and real-time features
- **NextAuth.js** with custom Supabase adapter for authentication
- **Discord OAuth** integration for seamless login
- **REST API** architecture with Next.js API routes
- **Vercel** deployment with analytics and speed insights

## Architecture Highlights

### Modern Next.js Patterns
The application leverages Next.js 15's App Router with strategic route grouping:

```
app/
├── (landing)/          # Marketing site with separate layout
│   ├── about/
│   ├── features/
│   ├── changelog/
│   └── legal/
└── (app)/app/          # Main application (protected)
    └── page.tsx        # Single-page app experience
```

### Data Architecture
**Four Core Models:**
- **Server**: Discord server metadata and member counts
- **Member**: User profiles with roles, avatars, and current nicknames
- **Arc**: Nickname theme groups (e.g., "Winter Event 2024")
- **ArcNickname**: Individual nickname assignments within each Arc

### State Management Strategy
Hybrid approach combining server and client state:

- **TanStack Query** handles server state with intelligent caching
- **Custom hooks** (`useServers`, `useMembers`, `useMemberManagement`) encapsulate data fetching logic
- **React Context** for cross-component state (theme, auth session)
- **Local state** for UI interactions and form management

### Component Architecture
Organized by domain and responsibility:

```
components/
├── app/              # Core application features
│   ├── AppLayout/    # Main app shell
│   ├── Sidebar/      # Server navigation
│   └── ServerContent/ # Member management interface
├── ui/               # Reusable design system components
└── landing/          # Marketing page components
```

## Technical Features

### Performance Optimizations
- **Turbopack** for lightning-fast development builds
- **React Server Components** reducing client-side JavaScript
- **Virtual scrolling** with TanStack Virtual for large member lists
- **Optimistic updates** for instant UI feedback
- **Request deduplication** via TanStack Query

### Developer Experience
- **TypeScript** strict mode for compile-time safety
- **ESLint** with Next.js configuration
- **Jest** testing infrastructure
- **Custom hooks** for business logic reusability
- **Consistent code organization** with clear separation of concerns

### UI/UX Engineering
- **Dark mode** support with next-themes
- **Smooth animations** using Motion library
- **Accessible components** built on Radix UI primitives
- **Responsive design** mobile-first approach
- **Toast notifications** with Sonner for user feedback
- **Drag-and-drop** functionality with dnd-kit

### Authentication Flow
1. Discord OAuth integration via NextAuth.js
2. Session stored in Supabase with custom adapter
3. Protected routes with middleware
4. Persistent sessions with JWT tokens

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (landing)/         # Public marketing pages
│   ├── (app)/app/         # Protected application
│   └── api/               # API routes
├── components/            # React components
├── lib/
│   ├── hooks/            # Custom React hooks
│   └── utilities/        # Helper functions and configs
└── types/                # TypeScript type definitions
```

## Key Technical Decisions

**Why Next.js 15?**
App Router provides optimal performance with React Server Components while maintaining flexibility for client interactivity.

**Why Supabase?**
PostgreSQL-backed platform offers relational data modeling, real-time subscriptions, and built-in auth integration.

**Why TanStack Query?**
Industry-standard solution for server state management with built-in caching, deduplication, and background refetching.

**Why Tailwind CSS 4.0?**
Utility-first approach enables rapid UI development while maintaining consistency and reducing CSS bundle size.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

## License

Private repository - All rights reserved.
