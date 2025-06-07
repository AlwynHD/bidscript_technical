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

Install Dependencies:
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

Open http://localhost:3000 in your browser