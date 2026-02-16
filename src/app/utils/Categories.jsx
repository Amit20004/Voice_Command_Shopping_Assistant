export const categories = {
  Dairy: ["milk", "cheese", "butter", "curd"],
  Fruits: ["apple", "banana", "orange", "mango"],
  Vegetables: ["potato", "onion", "tomato", "carrot"],
  Grains: ["rice", "wheat", "dal"],
  Snacks: ["chips", "biscuits", "cookies"],
  Beverages: ["tea", "coffee", "juice"],
};

export function categorizeItem(name) {
  const lower = name.toLowerCase();

  for (let category in categories) {
    if (categories[category].some(keyword =>
      lower.includes(keyword)
    )) {
      return category;
    }
  }

  return "Others";
}
