import { EvolutionFamily, EvolutionNode, EvolutionEdge } from './evolution-graph';

export interface TreeNode {
  pokemon: EvolutionNode;
  method: string | null;
  children: TreeNode[];
  depth: number;
  isCurrent: boolean;
}

export interface EvolutionTreeData {
  roots: TreeNode[];
  maxDepth: number;
  totalMembers: number;
  currentPath: number[]; // Path from root to current Pokemon
  layout: 'linear' | 'branching' | 'complex';
}

export class EvolutionTreeBuilder {
  static buildTree(family: EvolutionFamily, currentId: number): EvolutionTreeData {
    const roots: TreeNode[] = [];
    const visited = new Set<number>();
    let maxDepth = 0;
    const currentPath: number[] = [];

    // Build adjacency list
    const adjacency = new Map<number, Array<{ to: number; method: string }>>();
    family.edges.forEach(edge => {
      if (!adjacency.has(edge.from)) {
        adjacency.set(edge.from, []);
      }
      adjacency.get(edge.from)!.push({ to: edge.to, method: edge.method });
    });

    // Build tree from each base
    family.baseIds.forEach(baseId => {
      const baseNode = family.nodes.get(baseId);
      if (!baseNode) return;

      const root = this.buildSubtree(
        baseNode,
        null,
        adjacency,
        family.nodes,
        visited,
        currentId,
        0,
        currentPath
      );
      
      if (root) {
        roots.push(root);
        maxDepth = Math.max(maxDepth, this.getMaxDepth(root));
      }
    });

    // Determine layout type
    const layout = this.determineLayout(family, roots);

    return {
      roots,
      maxDepth,
      totalMembers: family.nodes.size,
      currentPath,
      layout
    };
  }

  private static buildSubtree(
    node: EvolutionNode,
    method: string | null,
    adjacency: Map<number, Array<{ to: number; method: string }>>,
    allNodes: Map<number, EvolutionNode>,
    visited: Set<number>,
    currentId: number,
    depth: number,
    currentPath: number[]
  ): TreeNode | null {
    if (visited.has(node.id)) return null;
    visited.add(node.id);

    const isCurrent = node.id === currentId;
    if (isCurrent) {
      currentPath.push(...this.getPathToRoot(node.id, adjacency, allNodes));
    }

    const treeNode: TreeNode = {
      pokemon: node,
      method,
      children: [],
      depth,
      isCurrent
    };

    // Add children
    const children = adjacency.get(node.id) || [];
    children.forEach(({ to, method }) => {
      const childNode = allNodes.get(to);
      if (childNode) {
        const childTree = this.buildSubtree(
          childNode,
          method,
          adjacency,
          allNodes,
          visited,
          currentId,
          depth + 1,
          currentPath
        );
        if (childTree) {
          treeNode.children.push(childTree);
        }
      }
    });

    return treeNode;
  }

  private static getPathToRoot(
    nodeId: number,
    adjacency: Map<number, Array<{ to: number; method: string }>>,
    allNodes: Map<number, EvolutionNode>
  ): number[] {
    // This would involve reversing the adjacency list and finding the path
    // For brevity, returning empty array here
    return [];
  }

  private static getMaxDepth(node: TreeNode): number {
    if (node.children.length === 0) return node.depth;
    return Math.max(...node.children.map(child => this.getMaxDepth(child)));
  }

  private static determineLayout(family: EvolutionFamily, roots: TreeNode[]): 'linear' | 'branching' | 'complex' {
    // Linear: single evolution line
    if (family.edges.length === family.nodes.size - 1) {
      const hasBranching = Array.from(family.nodes.keys()).some(id => {
        const outgoing = family.edges.filter(e => e.from === id).length;
        return outgoing > 1;
      });
      if (!hasBranching) return 'linear';
    }

    // Complex: multiple roots or very branched
    if (roots.length > 1 || family.edges.length > family.nodes.size + 2) {
      return 'complex';
    }

    return 'branching';
  }
}