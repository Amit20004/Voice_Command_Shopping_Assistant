"use client";

import { useEffect, useState } from "react";
import VoiceButton from "./components/VoiceButton";
import ItemCard from "./components/ItemCard";
import SuggestionBox from "./components/SuggestionBox";
import { Toaster } from "react-hot-toast";
import { categorizeItem } from "./utils/Categories";
import { getRecommendations } from "./utils/Recommendation";

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

export default function Home() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Load items from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Save items to localStorage & update suggestions whenever items change
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    setSuggestions(getRecommendations(items));
  }, [items]);

  // ----------------- Voice Command Handler -----------------
  const handleCommand = (data: CommandData) => {
    if (!data?.action) return;

   if (data.action === "add" && data.name) {
  const itemName: string = data.name;
  const category = categorizeItem(itemName);

  setItems(prev => [
    ...prev,
    {
      name: itemName,
      quantity: data.quantity || 1,
      category,
    },
  ]);
}


    if (data.action === "remove" && data.name) {
      setItems(prev => prev.filter(i => i.name !== data.name));
    }

    if (data.action === "remove-all") {
      setItems([]);
    }
  };

  // ----------------- JSX -----------------
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "12px", background: "#333", color: "#fff" },
        }}
      />

      <div className="min-h-screen flex justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Voice Shopping Assistant
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Manage your shopping list using voice commands.
            </p>
          </div>

          {/* Voice & Help Section */}
          <div className="section-card p-6 text-center mb-8">
            <VoiceButton onCommand={handleCommand} />

            <div className="bg-white shadow-md rounded-xl p-3 mb-4 border mt-4">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="w-full flex justify-between items-center font-medium text-gray-700"
              >
                🎤 How to Speak
                <span>{showHelp ? "▲" : "▼"}</span>
              </button>

              {showHelp && (
                <div className="mt-3 text-sm text-gray-600 space-y-2">
                  <div>
                    <p className="font-semibold text-black">🇬🇧 English Commands:</p>
                    <ul className="list-disc ml-5">
                      <li>“Add 2 apples”</li>
                      <li>“Remove banana”</li>
                      <li>“Remove all”</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <p className="text-gray-400 text-sm mt-4">
              Try: “Add milk” or "Add 1kg rice"
            </p>
          </div>

          {/* Shopping List Section */}
          <div className="section-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Shopping List</h2>
              {items.length > 0 && (
                <button
                  onClick={() => handleCommand({ action: "remove-all" })}
                  className="text-red-500 text-sm hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {items.length === 0 && (
              <p className="text-gray-400 text-sm text-center">
                No items yet. Use voice to add.
              </p>
            )}

            <div className="space-y-3">
              {(showAll ? items : items.slice(0, 5)).map((item, i) => (
                <ItemCard key={i} item={item} />
              ))}

              {items.length > 5 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-3 text-sm text-blue-500 font-medium"
                >
                  {showAll ? "Show Less" : "View All Items"}
                </button>
              )}
            </div>
          </div>

          {/* Suggestions Section */}
          <SuggestionBox suggestions={suggestions} />
        </div>
      </div>
    </>
  );
}
