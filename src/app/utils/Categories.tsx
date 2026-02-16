const categoryMap: Record<string, string[]> = {
  "🥬 Vegetables": ["tomato", "potato", "onion", "carrot", "spinach", "lettuce", "broccoli", "pepper", "cucumber", "garlic", "ginger"],
  "🍎 Fruits": ["apple", "banana", "orange", "mango", "grape", "strawberry", "lemon", "lime", "pineapple", "watermelon", "avocado"],
  "🥛 Dairy": ["milk", "cheese", "butter", "yogurt", "cream", "eggs", "egg"],
  "🍞 Bakery": ["bread", "cake", "cookies", "muffin", "croissant", "bagel", "tortilla"],
  "🥩 Meat & Protein": ["chicken", "beef", "pork", "fish", "shrimp", "salmon", "tuna", "turkey", "tofu"],
  "🫙 Pantry": ["rice", "pasta", "flour", "sugar", "salt", "oil", "vinegar", "sauce", "cereal", "oats", "beans", "lentils"],
  "🧴 Household": ["soap", "detergent", "tissue", "towel", "sponge", "bleach", "trash bags"],
  "🍫 Snacks": ["chips", "chocolate", "candy", "nuts", "popcorn", "crackers", "granola"],
  "🥤 Beverages": ["water", "juice", "soda", "coffee", "tea", "beer", "wine"],
};

export function categorizeItem(name: string): string {
  const lower = name.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (keywords.some(k => lower.includes(k))) {
      return category;
    }
  }
  return "🛒 Other";
}

export function getCategoryEmoji(category: string): string {
  return category.split(" ")[0] || "🛒";
}
