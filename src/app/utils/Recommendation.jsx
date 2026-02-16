export function getRecommendations(items) {
  const suggestions = [];
  const names = items.map(i => i.name.toLowerCase());
  const month = new Date().getMonth(); 
  if (names.includes("milk") && !names.includes("bread")) {
    suggestions.push("Bread");
  }

  if (names.includes("tea") && !names.includes("biscuits")) {
    suggestions.push("Biscuits");
  }

  if (names.includes("rice") && !names.includes("dal")) {
    suggestions.push("Dal");
  }

  if (month === 4 && !names.includes("mango")) {
    suggestions.push("Mango (Seasonal)");
  }

  return suggestions;
}
