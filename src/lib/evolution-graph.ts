import pokemonData from '@/data/pokedex.json';
import type { Pokemon } from '@/types/pokemon';

export interface EvolutionNode {
  id: number;
  name: string;
  sprite: string;
  image: string;
  types: string[];
  species: string;
}

export interface EvolutionEdge {
  from: number;
  to: number;
  method: string;
}

export interface EvolutionFamily {
  id: string; // Family identifier (base pokemon id)
  nodes: Map<number, EvolutionNode>;
  edges: EvolutionEdge[];
  baseIds: Set<number>; // Can have multiple bases (e.g., baby Pokemon added later)
}

class EvolutionGraph {
  private families: Map<string, EvolutionFamily> = new Map();
  private pokemonToFamily: Map<number, string> = new Map();
  
  constructor() {
    this.buildGraph();
  }

  private normalizeEvolutionData(data: any): [string, string][] {
    if (!data) return [];
    
    // Handle array of arrays
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      return data;
    }
    
    // Handle single tuple
    if (Array.isArray(data) && data.length === 2 && 
        typeof data[0] === 'string' && typeof data[1] === 'string') {
      return [[data[0], data[1]]];
    }
    
    return [];
  }

  private buildGraph() {
    const allPokemon = pokemonData as Pokemon[];
    const processedIds = new Set<number>();
    
    // First pass: Create all nodes
    const nodes = new Map<number, EvolutionNode>();
    allPokemon.forEach(pokemon => {
      nodes.set(pokemon.id, {
        id: pokemon.id,
        name: pokemon.name.english,
        sprite: pokemon.image.sprite,
        image: pokemon.image.hires,
        types: pokemon.type,
        species: pokemon.species
      });
    });

    // Second pass: Find all evolution families
    allPokemon.forEach(pokemon => {
      if (processedIds.has(pokemon.id)) return;
      
      // Find the family base(s)
      const familyMembers = this.findFamilyMembers(pokemon.id, allPokemon);
      const familyBases = this.findFamilyBases(familyMembers, allPokemon);
      
      // Create family
      const familyId = Math.min(...familyBases).toString();
      const family: EvolutionFamily = {
        id: familyId,
        nodes: new Map(),
        edges: [],
        baseIds: new Set(familyBases)
      };

      // Add all family members
      familyMembers.forEach(id => {
        const node = nodes.get(id);
        if (node) {
          family.nodes.set(id, node);
          this.pokemonToFamily.set(id, familyId);
          processedIds.add(id);
        }
      });

      // Build edges
      familyMembers.forEach(id => {
        const pokemon = allPokemon.find(p => p.id === id);
        if (!pokemon) return;

        const nextEvos = this.normalizeEvolutionData(pokemon.evolution.next);
        nextEvos.forEach(([toId, method]) => {
          family.edges.push({
            from: id,
            to: parseInt(toId),
            method
          });
        });
      });

      this.families.set(familyId, family);
    });
  }

  private findFamilyMembers(startId: number, allPokemon: Pokemon[]): Set<number> {
    const members = new Set<number>();
    const queue = [startId];
    const visited = new Set<number>();

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;
      
      visited.add(currentId);
      members.add(currentId);

      const pokemon = allPokemon.find(p => p.id === currentId);
      if (!pokemon) continue;

      // Add previous evolutions
      const prevEvos = this.normalizeEvolutionData(pokemon.evolution.prev);
      prevEvos.forEach(([prevId]) => {
        const id = parseInt(prevId);
        if (!visited.has(id)) queue.push(id);
      });

      // Add next evolutions
      const nextEvos = this.normalizeEvolutionData(pokemon.evolution.next);
      nextEvos.forEach(([nextId]) => {
        const id = parseInt(nextId);
        if (!visited.has(id)) queue.push(id);
      });
    }

    return members;
  }

  private findFamilyBases(members: Set<number>, allPokemon: Pokemon[]): number[] {
    const bases: number[] = [];
    
    members.forEach(id => {
      const pokemon = allPokemon.find(p => p.id === id);
      if (!pokemon) return;
      
      const prevEvos = this.normalizeEvolutionData(pokemon.evolution.prev);
      if (prevEvos.length === 0) {
        bases.push(id);
      }
    });

    return bases;
  }

  getFamily(pokemonId: number): EvolutionFamily | null {
    const familyId = this.pokemonToFamily.get(pokemonId);
    if (!familyId) return null;
    return this.families.get(familyId) || null;
  }

  getAllFamilies(): EvolutionFamily[] {
    return Array.from(this.families.values());
  }
}

// Singleton instance
let graphInstance: EvolutionGraph | null = null;

export function getEvolutionGraph(): EvolutionGraph {
  if (!graphInstance) {
    graphInstance = new EvolutionGraph();
  }
  return graphInstance;
}