import { ShoppingCart, X } from "lucide-react";
import { getCategoryEmoji } from "../utils/Categories";

interface ShoppingItem {
  name: string;
  quantity: number;
  category?: string;
}

interface ItemCardProps {
  item: ShoppingItem;
  onRemove: () => void;
}

const ItemCard = ({ item, onRemove }: ItemCardProps) => {
  return (
    <div className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-card border border-border animate-float-up group">
      <span className="text-xl w-8 h-8 flex items-center justify-center rounded-md bg-secondary">
        {item.category ? getCategoryEmoji(item.category) : "🛒"}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-card-foreground capitalize truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">
          {item.category || "Other"} · Qty: {item.quantity}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ItemCard;
