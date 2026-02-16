import { Sparkles, Plus } from "lucide-react";

interface SuggestionBoxProps {
  suggestions: string[];
  onAdd: (name: string) => void;
}

const SuggestionBox = ({ suggestions, onAdd }: SuggestionBoxProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-6 bg-card rounded-lg p-4 shadow-card border border-border animate-float-up">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-accent" />
        <h3 className="text-sm font-semibold text-card-foreground">You might also need</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onAdd(s)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors capitalize"
          >
            <Plus className="w-3 h-3" />
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionBox;
