'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import { Zap, Search, Filter } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const handleExplore = () => {
    router.push('/pokemon')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main Content Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Badge variant="secondary" className="text-sm font-medium">
                    Gotta Catch 'Em All
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PokéPortal
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover, explore, and learn about all your favorite Pokémon in one comprehensive directory
                </p>
              </div>

              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <div className="flex items-center gap-2 justify-center text-gray-600">
                  <Search className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">Search & Discover</span>
                </div>
                <div className="flex items-center gap-2 justify-center text-gray-600">
                  <Filter className="h-5 w-5 text-purple-500" />
                  <span className="text-sm">Filter by Type</span>
                </div>
                <div className="flex items-center gap-2 justify-center text-gray-600">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm">Detailed Stats</span>
                </div>
              </div>

              {/* Type Badges Preview */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Dragon'].map((type) => (
                  <Badge key={type} variant="outline" className="text-xs">
                    {type}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-xs text-gray-400">
                  +12 more
                </Badge>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <Button 
                  onClick={handleExplore}
                  size="lg" 
                  className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Explore Pokémon Directory
                </Button>
                
                <p className="text-sm text-gray-500">
                  Browse through hundreds of Pokémon with detailed information
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}