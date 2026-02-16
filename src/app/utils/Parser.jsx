export function parseCommand(text) {
  const lower = text.toLowerCase();

  if (lower.includes("remove all") || lower.includes("delete all")) {
    return { action: "remove-all" };
  }

  const addKeywords = ["add", "buy", "need"];
  const removeKeywords = ["remove", "delete"];

  let action = "add";

  if (removeKeywords.some((k) => lower.includes(k))) {
    action = "remove";
  }

  const quantityMatch = lower.match(/\d+/);
  const quantity = quantityMatch ? parseInt(quantityMatch[0]) : 1;

  let name = lower.replace(/\d+/g, "");

  [...addKeywords, ...removeKeywords].forEach((k) => {
    name = name.replace(k, "");
  });

  name = name.replace(/kg|gram|litre|liter|piece/g, "").trim();

  return { action, name, quantity };
}
