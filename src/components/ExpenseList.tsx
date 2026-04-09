import type { Expense } from "@/types/expense";
import ExpenseItem from "@/components/ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
}

/** Skeleton placeholder rows shown while data is loading. */
function SkeletonList() {
  return (
    <ul className="expense-list" aria-label="Loading expenses" aria-busy="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="skeleton-item">
          <div className="skeleton skeleton-icon" />
          <div className="skeleton-text">
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line skeleton-line-short" />
          </div>
          <div className="skeleton skeleton-amount" />
        </li>
      ))}
    </ul>
  );
}

/** Empty state when there are no expenses. */
function EmptyState() {
  return (
    <div className="empty-state" role="status">
      <div className="empty-icon" aria-hidden="true">💸</div>
      <p className="empty-title">No expenses yet</p>
      <p className="empty-subtitle">
        Use the form above to record your first expense.
      </p>
    </div>
  );
}

/**
 * Renders the full list of expenses, with loading skeleton and empty state.
 */
export default function ExpenseList({
  expenses,
  loading,
  onDelete,
}: ExpenseListProps) {
  return (
    <div className="card">
      <div className="list-header">
        <h2 className="card-title" style={{ marginBottom: 0 }}>
          Recent Expenses
        </h2>
        {!loading && expenses.length > 0 && (
          <span className="list-count" aria-label={`${expenses.length} expenses`}>
            {expenses.length}
          </span>
        )}
      </div>

      {loading ? (
        <SkeletonList />
      ) : expenses.length === 0 ? (
        <EmptyState />
      ) : (
        <ul
          className="expense-list"
          aria-label="Expense list"
          aria-live="polite"
          aria-relevant="removals additions"
        >
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
