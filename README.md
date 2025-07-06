# Will & Testament Generator

A React-based application that generates personalized will and testament documents through a multilingual questionnaire interface.

## Quick Start

```bash
# Development
npm run dev

# Build for deployment
./build.sh
```

## Deployment

The project includes a deployment fix for the directory structure issue:

- **Issue**: Build creates `dist/public` but deployment expects files in `dist` root
- **Solution**: Automated post-build script that moves files to correct location
- **Usage**: Run `./build.sh` instead of `npm run build` for deployment-ready builds

## Features

- Multilingual support (English & Malayalam)
- Progressive questionnaire with conditional logic
- Responsive design with Tailwind CSS
- Type-safe validation with Zod
- Accessible UI components with Radix UI

## Project Structure

```
├── client/                 # React frontend
├── server/                 # Express backend (future)
├── shared/                 # Shared types and schemas
├── scripts/               # Build and deployment scripts
└── dist/                  # Build output (generated)
```

## Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite with custom deployment fix
- **UI**: Radix UI components with shadcn/ui
- **Validation**: Zod schemas
- **Routing**: Wouter for client-side routing