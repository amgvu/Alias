# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build` 
- **Linting**: `npm run lint`
- **Testing**: `npm run test` (Jest)
- **Start production**: `npm start`

## Project Architecture

**Alias** is a Next.js 15 application for Discord server nickname management, built with React 19 and TypeScript.

### Core Tech Stack
- **Framework**: Next.js 15 with App Router
- **Database**: Supabase with NextAuth.js integration
- **Styling**: Tailwind CSS 4.0 with Motion animations
- **State Management**: TanStack Query for server state, React hooks for local state
- **UI Components**: Radix UI primitives with custom styling
- **Authentication**: NextAuth.js with Supabase adapter

### Application Structure

The app uses Next.js App Router with two main route groups:

**Landing Pages** (`src/app/(landing)/`):
- Marketing site with about, features, changelog, contact, legal pages
- Uses separate layout from the main app

**Main Application** (`src/app/(app)/app/`):
- Discord server management interface at `/app`
- Protected route requiring authentication
- Single-page application experience

### Key Architectural Patterns

**Component Organization**:
- `src/components/app/`: Main application components (AppLayout, Sidebar, ServerContent)
- `src/components/ui/`: Reusable UI components and animations
- `src/components/landing/`: Landing page components

**Data Layer**:
- Custom hooks in `src/lib/hooks/` handle all data fetching and state management
- API utilities in `src/lib/utilities/api/` for server communication
- Supabase client configuration in `src/lib/utilities/supabase.ts`

**Core Data Models** (see `src/types/types.ts`):
- `Server`: Discord server metadata
- `Member`: Discord user with roles and nickname info
- `Arc`: Nickname groupings/categories
- `ArcNickname`: Individual nickname assignments

**State Management Pattern**:
- Server selection managed by `useServers` hook
- Member data fetched via `useMembers` hook with TanStack Query
- Local nickname updates handled by `useMemberManagement` hook
- Multi-selection state managed by `useCheckboxSelection` hook

**Authentication Flow**:
- NextAuth.js handles Discord OAuth
- Session state managed by `useAuth` hook
- Supabase adapter stores user sessions

The application's main flow: user authenticates → selects Discord server → views/manages member nicknames → applies changes via "Arcs" (nickname themes/categories).