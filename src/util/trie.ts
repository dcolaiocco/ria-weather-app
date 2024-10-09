export class Trie {
  root: TrieNode
  constructor() {
    this.root = { reference: [] };
  }

  insert(inputWord: string, reference: number) {
    let currentNode = this.root;
    const word = inputWord.toLowerCase();

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!currentNode[char] && (i === word.length - 1)) {
        currentNode[char] = {reference: [reference]};
      } else if (!currentNode[char]) {
        currentNode[char] = { reference: [] };
      } else if (currentNode[char] && (i === word.length - 1)) {
        (currentNode[char]! as TrieNode).reference.push(reference);
      }

      currentNode = currentNode[char]! as TrieNode;
    }
  }

  search(inputWord: string): number[] {
    let currentNode = this.root;
    const word = inputWord.toLowerCase();

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!currentNode[char]) {
          return [];
      }

      currentNode = currentNode[char]! as TrieNode;
    }

    return currentNode.reference;
  }

  getReferencesFrom(inputWord: string, wordCount: number = 10): number[] {
    const word = inputWord.toLowerCase();
    const references: number[] = [];
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++){
      const char = word[i];

      if (!currentNode[char]) {
        break;
      }
      currentNode = currentNode[char]! as TrieNode;
    }
    
    // Case: no matches
    if(currentNode === this.root) {
      // console.log(`No matches`)
      return references;
    }

    let nodeTrail: TrieNode[] = [currentNode];

    while (references.length < wordCount) {
      // console.log('NodeTrail', nodeTrail)
      let workNode = nodeTrail.pop()
      if (!workNode) {
        // console.log(`No available nodes, breaking`)
        break
      }
      // console.log(`New workNode`, {workNode, nodeTrail})
      for(const [char, node] of Object.entries(workNode as TrieNode)){
        // console.log(`Processing node for char: "${char}"`, {node, workNode})

        // Found an endpoint
        if (char === 'reference'){
          if ((node as number[]).length > 0) {
            // console.log(`Pushing reference: ${node} for node on char: ${char}`, {workNode})

            references.push(...node as number[])
            continue
          }
          // Not traversable
          if (char === 'reference' && (node as number[]).length < 1){
            // console.log(`Non traversable node found`)
            continue
          }
        }

        // Push for traversal
        if (char !== 'reference' && node) {
          // console.log(`Pushing node to nodeTrail`, {node, workNode})
          nodeTrail.push(node as TrieNode)
        }
      }
    }
    return references;
  }
}

interface TrieNode {
  reference: number[];
  [key: string]: TrieNode | number[] | undefined;
}