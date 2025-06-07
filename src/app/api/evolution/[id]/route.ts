import { NextRequest } from 'next/server';
import { getEvolutionGraph } from '@/lib/evolution-graph';
import { EvolutionTreeBuilder } from '@/lib/evolution-tree-builder';

//Get the evolution tree for specific pokemon
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pokemonId = parseInt(id);
    
    // Validate pokemon
    if (isNaN(pokemonId)) {
      return Response.json({ error: 'Invalid Pokemon ID' }, { status: 400 });
    }

    // Get Graph of evolution
    const graph = getEvolutionGraph();
    const family = graph.getFamily(pokemonId);
    
    // Check if family exists
    if (!family) {
      return Response.json({ error: 'Evolution family not found' }, { status: 404 });
    }

    // Build Tree
    const treeData = EvolutionTreeBuilder.buildTree(family, pokemonId);
    
    //return Tree
    return Response.json({
      pokemonId,
      familyId: family.id,
      tree: treeData
    });
    
    // Error Handling
  } catch (error) {
    console.error('Evolution API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}