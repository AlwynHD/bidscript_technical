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
  ```bash
  git clone https://github.com/yourusername/pokemon-portal.git
  cd pokemon-portal

Install dependencies:
bashnpm install
# or
yarn install
# or
pnpm install

Run the development server:
bashnpm run dev
# or
yarn dev
# or
pnpm dev

Open http://localhost:3000

Project Structure
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
User Guide
Navigation

Landing Page: Introduction to the Pokédex
Dashboard: Main browsing interface with search and filters
Pokémon Details: Click any Pokémon card to view detailed information

Search & Filter

Text Search: Search by Pokémon name or ability
Type Filtering: Select up to 2 types to filter results
Real-time Updates: Results update automatically as you type
Clear Filters: Reset all search criteria with one click

Favorites

Add to Favorites: Click the heart icon on any Pokémon card
View Favorites: Switch to the Favorites tab in the dashboard
Persistent Storage: Favorites are saved in browser local storage
Bulk Clear: Remove all favorites at once

Evolution Trees

Linear Evolution: Simple evolution chains (e.g., Bulbasaur → Ivysaur → Venusaur)
Branching Evolution: Multiple evolution paths (e.g., Poliwag → Poliwhirl → Poliwrath/Politoed)
Complex Evolution: Many evolutions from one base (e.g., Eevee's multiple evolutions)
Interactive Navigation: Click any Pokémon in the evolution tree to view its details

API Routes
/api/poke_search

Method: GET
Query Parameters:

query: Search term for name/ability
types: Comma-separated list of types
page: Page number for pagination
limit: Results per page



/api/pokemon/[id]

Method: GET
Returns: Complete Pokémon data for the specified ID

/api/evolution/[id]

Method: GET
Returns: Evolution tree data for the Pokémon's family

Key Features Implementation
Infinite Scroll

Uses Intersection Observer API for performance
Automatic loading when scrolling near bottom
Visual loading indicators

Search Debouncing

300ms debounce on text input
Immediate search for type filters
Prevents excessive API calls

Evolution Graph Algorithm

Custom graph data structure for evolution relationships
Handles complex cases like multiple base forms
Dynamic layout selection based on tree structure

Performance Optimizations

Image lazy loading with fallbacks
Memoized search results
Efficient batch fetching for favorites
Skeleton loaders for better perceived performance

Development
Custom Components
All UI components follow a modular pattern and can be found in src/components/.
Adding New Features

New API Routes: Add to src/app/api/
New Hooks: Create in src/hooks/
UI Components: Add to src/components/ui/

Type Safety
The project uses TypeScript throughout. Key type definitions are in src/types/pokemon.ts.
Future Enhancements

Sorting Options: Sort by stats, ID, or alphabetically
Advanced Filters: Filter by generation, abilities, or stat ranges
Comparison Tool: Compare stats between multiple Pokémon
Team Builder: Create and save Pokémon teams
Battle Simulator: Simple type effectiveness calculator

Technical Decisions

Static Data: Used pre-loaded JSON for instant performance and offline capability
Context for State: Chose Context API over external state management for simplicity
Custom Hooks: Encapsulated complex logic for reusability and testing
Tailwind v4: Leveraged latest CSS features for modern styling

Acknowledgments
Created by Alwyn