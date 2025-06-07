# Pokédex Information Portal

A modern, interactive Pokémon information portal built with Next.js that allows users to explore, search, and learn about Pokémon with detailed stats, evolution chains, and more.

**[Live Demo](https://technical-theta.vercel.app)**

## Features

- **Pokémon Database**: Browse through hundreds of Pokémon with detailed information
- **Search & Filtering**: Search by name, ability, or filter by up to 2 types simultaneously
- **Real-time Search**: Instant results with debounced search for optimal performance
- **Evolution Visualization**: Interactive evolution chains with three layout types (linear, branching, complex)
- **Favorites System**: Save favorite Pokémon with persistent local storage
- **Infinite Scrolling**: Seamless browsing experience with automatic loading
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, CSS Variables for theming
- **UI Components**: Custom components with shadcn/ui patterns
- **State Management**: React Context API, Custom hooks
- **Data Source**: Static JSON with 800+ Pokémon
- **Image Optimization**: Next.js Image component with fallbacks
- **Icons**: Lucide React, React Icons

## Installation

1. **Clone the repository:**
  ```
  git clone https://github.com/yourusername/pokemon-portal.git
  cd pokemon-portal
  ```
2. **Install Dependencies:**
```
npm install
# or
yarn install
# or
pnpm install
```

3. **Run Development Environment:**
 ```
npm run dev
or
yarn dev
or
pnpm dev

Open http://localhost:3000
```
# Project Structure
```
├── public/               # Static assets
├── src/
│   ├── app/             # Next.js app router
│   │   ├── api/         # API routes
│   │   │   ├── evolution/[id]/
│   │   │   ├── poke_search/
│   │   │   └── pokemon/[id]/
│   │   ├── dashboard/   # Main browsing page
│   │   ├── pokemon/[id]/ # Individual Pokémon pages
│   │   └── page.tsx     # Landing page
│   ├── components/      # React components
│   │   ├── pokemon/     # Pokémon-specific components
│   │   │   └── detail/  # Detail page components
│   │   │       └── evolution/ # Evolution visualizations
│   │   └── ui/          # Reusable UI components
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   │   ├── evolution-graph.ts    # Evolution tree algorithms
│   │   └── evolution-tree-builder.ts
│   └── types/           # TypeScript type definitions
```
## User Guide
###  Navigation

- Landing Page: Introduction to the Pokédex
- Dashboard: Main browsing interface with search and filters
- Pokémon Details: Click any Pokémon card to view detailed information

###  Search & Filter

- Text Search: Search by Pokémon name or ability
- Type Filtering: Select up to 2 types to filter results
- Real-time Updates: Results update automatically as you type
- Clear Filters: Reset all search criteria with one click

###  Favorites

- Add to Favorites: Click the heart icon on any Pokémon card
- View Favorites: Switch to the Favorites tab in the dashboard
- Persistent Storage: Favorites are saved in browser local storage
- Bulk Clear: Remove all favorites at once

###  Evolution Trees

- Linear Evolution: Simple evolution chains (e.g., Bulbasaur → Ivysaur → Venusaur)
- Branching Evolution: Multiple evolution paths (e.g., Poliwag → Poliwhirl → Poliwrath/Politoed)
- Complex Evolution: Many evolutions from one base (e.g., Eevee's multiple evolutions)
- Interactive Navigation: Click any Pokémon in the evolution tree to view its details

## Technical Decisions

- Static Data: Used pre-loaded JSON for instant performance and offline capability
- Context for State: Chose Context API over external state management for simplicity
- Custom Hooks: Encapsulated complex logic for reusability and testing
- Tailwind v4: Leveraged latest CSS features for modern styling

##  Future Changes

- Comparison Tool: Compare stats between multiple Pokémon
- Team Builder: Create and save Pokémon teams
- Dataset: Use a dataset with more robust features

## Acknowledgments
Created by Alwyn