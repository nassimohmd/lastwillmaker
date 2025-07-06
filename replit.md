# Will & Testament Generator

## Overview

This is a React-based single-page application that generates personalized wills and testament documents. The application guides users through a multilingual questionnaire (English and Malayalam) to collect information about their wishes, assets, and beneficiaries, then generates a downloadable will document.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Hook Form for form state, React Query for async state
- **Form Validation**: Zod schemas for type-safe validation

### Backend Architecture
- **Current State**: Static website served via Vite dev server
- **Future Extension**: Ready for Express.js backend with database integration
- **Database ORM**: Drizzle ORM configured for PostgreSQL (via Neon)
- **Session Management**: Configured for connect-pg-simple sessions

## Key Components

### Frontend Components
1. **Home Page** (`/`): Language selection interface
2. **Questionnaire** (`/questionnaire`): Multi-step form with progress tracking
3. **Question Form**: Dynamic form renderer supporting multiple question types
4. **UI Components**: Complete set of accessible components based on Radix UI

### Form System
- **Question Types**: Select, radio, checkbox, text input
- **Conditional Logic**: Questions appear based on previous answers
- **Progress Tracking**: Visual progress indicator
- **Multilingual Support**: English and Malayalam translations

### Shared Resources
- **Questions Schema**: Centralized question definitions in TypeScript
- **Validation Schema**: Zod schemas for type-safe form validation
- **Type Definitions**: Shared TypeScript interfaces

## Data Flow

1. **Language Selection**: User chooses English or Malayalam
2. **Question Flow**: Progressive form completion with conditional branching
3. **Data Collection**: Form responses stored in local state
4. **Document Generation**: Planned PDF generation from collected data
5. **Download**: User receives generated will document

## External Dependencies

### Core Libraries
- React ecosystem (React, React DOM, React Hook Form)
- Vite for development and build tooling
- Tailwind CSS for styling
- Radix UI for accessible components

### Database & ORM
- Drizzle ORM for database operations
- Neon Database serverless PostgreSQL
- connect-pg-simple for session management

### Development Tools
- TypeScript for type safety
- ESBuild for server bundling
- PostCSS for CSS processing

## Deployment Strategy

### Current Setup
- **Development**: Vite dev server on port 5000
- **Build Process**: Vite builds frontend, ESBuild bundles server
- **Production**: Static files served from dist directory
- **Deployment Fix**: Post-build script moves files from dist/public to dist root

### Deployment Issue Resolution
**Issue**: Build created `dist/public` directory but deployment expected files in `dist` root
**Solution**: Created post-build script (`scripts/post-build.js`) that automatically moves files to correct location
**Usage**: Run `./build.sh` instead of `npm run build` for deployment-ready builds

### Future Enhancements
- Express.js server for API endpoints
- PostgreSQL database for data persistence
- PDF generation service for document creation
- User authentication and session management

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 06, 2025. Initial setup