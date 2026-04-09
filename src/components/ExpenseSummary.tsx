import type { Expense } from "@/types/expense";

interface ExpenseSummaryProps {
  expenses: Expense[];
  loading: boolean;
}

/**
 * Displays the aggregate total of all expenses.
 */
export default function ExpenseSummary({ expenses, loading }: ExpenseSummaryProps) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const count = expenses.length;

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);

  if (loading) {
    return (
      <div className="summary-card" aria-busy="true">
        <div className="summary-label">Total Expenses</div>
        <div className="summary-amount" style={{ opacity: 0.4 }}>—</div>
        <div className="summary-meta">Loading…</div>
      </div>
    );
  }

  return (
    <div className="summary-card" role="region" aria-label="Expense summary">
      <div className="summary-label">Total Expenses</div>
      <div className="summary-amount" aria-live="polite">
        {formatted}
      </div>
      <div className="summary-meta">
        {count === 0
          ? "No expenses recorded yet"
          : `Across ${count} expense${count !== 1 ? "s" : ""}`}
      </div>
    </div>
  );
}
