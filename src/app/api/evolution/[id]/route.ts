import { NextRequest } from 'next/server';
import { getEvolutionGraph } from '@/lib/evolution-graph';
import { EvolutionTreeBuilder } from '@/lib/evolution-tree-builder';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pokemonId = parseInt(id);
    
    if (isNaN(pokemonId)) {
      return Response.json({ error: 'Invalid Pokemon ID' }, { status: 400 });
    }

    const graph = getEvolutionGraph();
    const family = graph.getFamily(pokemonId);
    
    if (!family) {
      return Response.json({ error: 'Evolution family not found' }, { status: 404 });
    }

    const treeData = EvolutionTreeBuilder.buildTree(family, pokemonId);
    
    return Response.json({
      pokemonId,
      familyId: family.id,
      tree: treeData
    });
    
  } catch (error) {
    console.error('Evolution API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}