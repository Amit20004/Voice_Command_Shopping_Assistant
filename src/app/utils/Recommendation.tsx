const pairings: Record<string, string[]> = {
  bread: ["butter", "jam", "cheese"],
  pasta: ["sauce", "cheese", "garlic"],
  rice: ["beans", "chicken", "oil"],
  eggs: ["bread", "butter", "cheese"],
  chicken: ["rice", "garlic", "onion"],
  milk: ["cereal", "coffee", "cookies"],
  coffee: ["milk", "sugar", "cream"],
  chips: ["soda", "salsa"],
  salmon: ["lemon", "rice", "butter"],
};

export function getRecommendations(items: { name: string }[]): string[] {
  const itemNames = items.map(i => i.name.toLowerCase());
  const suggestions = new Set<string>();

  for (const name of itemNames) {
    const matches = pairings[name];
    if (matches) {
      for (const m of matches) {
        if (!itemNames.includes(m)) {
          suggestions.add(m);
        }
      }
    }
  }

  return Array.from(suggestions).slice(0, 4);
}
