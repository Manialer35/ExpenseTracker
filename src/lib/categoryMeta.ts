import type { ExpenseCategory } from "@/types/expense";

/** Maps each category to an emoji icon and a CSS class for its background colour. */
const CATEGORY_META: Record<
  ExpenseCategory,
  { icon: string; className: string }
> = {
  "Food & Dining":  { icon: "🍔", className: "cat-food" },
  "Transportation": { icon: "🚌", className: "cat-transport" },
  "Housing":        { icon: "🏠", className: "cat-housing" },
  "Entertainment":  { icon: "🎬", className: "cat-entertain" },
  "Healthcare":     { icon: "💊", className: "cat-health" },
  "Shopping":       { icon: "🛍️", className: "cat-shopping" },
  "Education":      { icon: "📚", className: "cat-education" },
  "Other":          { icon: "📋", className: "cat-other" },
};

export function getCategoryMeta(category: ExpenseCategory) {
  return CATEGORY_META[category] ?? { icon: "💰", className: "cat-other" };
}
