'use client'
import { useEffect, useState } from "react";
import VoiceButton from "./components/VoiceButton";
import ItemCard from "./components/ItemCard";
import SuggestionBox from "./components/SuggestionBox";
import { categorizeItem } from "./utils/Categories";
import { getRecommendations } from "./utils/Recommendation";
import { ShoppingCart, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

interface ShoppingItem {
  name: string;
  quantity: number;
  category?: string;
}

interface CommandData {
  action?: "add" | "remove" | "remove-all";
  name?: string;
  quantity?: number;
}

const Index = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("shopping-items");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("shopping-items", JSON.stringify(items));
    setSuggestions(getRecommendations(items));
  }, [items]);

  const handleCommand = (data: CommandData) => {
    if (!data?.action) return;
    if (data.action === "add" && data.name) {
      setItems(prev => [...prev, { name: data.name!, quantity: data.quantity || 1, category: categorizeItem(data.name!) }]);
    }
    if (data.action === "remove" && data.name) {
      setItems(prev => prev.filter(i => i.name !== data.name));
    }
    if (data.action === "remove-all") {
      setItems([]);
    }
  };

  const addSuggestion = (name: string) => {
    handleCommand({ action: "add", name, quantity: 1 });
  };

  const removeItem = (name: string) => {
    handleCommand({ action: "remove", name });
  };

  const displayedItems = showAll ? items : items.slice(0, 5);

  return (
    <div className="min-h-screen flex justify-center px-4 py-10">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          
          <h1 className="font-display text-4xl font-bold text-foreground tracking-tight">
            Shopping Assistant
          </h1>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            Add items to your list using voice commands — fast and hands-free.
          </p>
        </div>

        {/* Voice Section */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center space-y-4">
          <VoiceButton onCommand={handleCommand} />

          <button
            onClick={() => setShowHelp(!showHelp)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            🎤 How to speak
            {showHelp ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showHelp && (
            <div className="text-left text-sm text-muted-foreground bg-secondary/50 rounded-lg p-4 space-y-1 animate-float-up">
              <p className="font-semibold text-foreground mb-2">Commands:</p>
              <p>• "Add 2 apples"</p>
              <p>• "Remove banana"</p>
              <p>• "Remove all"</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Try: <span className="font-medium text-foreground">"Add milk"</span> or <span className="font-medium text-foreground">"Add 1 kg rice"</span>
          </p>
        </div>

        {/* Shopping List */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-lg font-semibold text-card-foreground">
              Shopping List
              {items.length > 0 && (
                <span className="ml-2 text-xs font-body font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              )}
            </h2>
            {items.length > 0 && (
              <button
                onClick={() => handleCommand({ action: "remove-all" })}
                className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-10 h-10 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">
                Your list is empty. Use voice to add items.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {displayedItems.map((item, i) => (
                <ItemCard key={`${item.name}-${i}`} item={item} onRemove={() => removeItem(item.name)} />
              ))}

              {items.length > 5 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="w-full mt-2 text-sm text-primary font-medium hover:underline transition-all"
                >
                  {showAll ? "Show Less" : `View All ${items.length} Items`}
                </button>
              )}
            </div>
          )}
        </div>

        <SuggestionBox suggestions={suggestions} onAdd={addSuggestion} />
      </div>
    </div>
  );
};

export default Index;
