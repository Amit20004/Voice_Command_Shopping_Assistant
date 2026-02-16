export default function SuggestionBox({ suggestions }) {
  if (!suggestions.length) return null;

  return (
    <div className="mt-6 bg-yellow-50 border border-yellow-200 p-5 rounded-xl shadow-sm">
      <h4 className="font-semibold text-yellow-700 mb-2">
        Smart Suggestions
      </h4>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s, i) => (
          <span
            key={i}
            className="bg-white  px-3 py-1 rounded-full text-sm text-gray-700"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
