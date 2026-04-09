"use client";

import { useState } from "react";
import type { Expense } from "@/types/expense";
import { getCategoryMeta } from "@/lib/categoryMeta";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => Promise<void>;
}

/**
 * A single expense row with category icon, description, date, amount, and delete button.
 */
export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const [deleting, setDeleting] = useState(false);
  const { icon, className } = getCategoryMeta(expense.category);

  const amountFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(expense.amount);

  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(expense.created_at));

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDelete(expense.id);
    } catch {
      // Parent handles error; reset local state so button is usable again
      setDeleting(false);
    }
  }

  return (
    <li
      className={`expense-item${deleting ? " deleting" : ""}`}
      aria-label={`${expense.category}: ${expense.description}, ${amountFormatted}`}
    >
      {/* Category icon */}
      <div
        className={`expense-category-badge ${className}`}
        aria-hidden="true"
        title={expense.category}
      >
        {icon}
      </div>

      {/* Info */}
      <div className="expense-info">
        <div className="expense-description" title={expense.description}>
          {expense.description}
        </div>
        <div className="expense-meta">
          <span className="expense-category-label">{expense.category}</span>
          <span className="expense-date" aria-label={`Added on ${dateFormatted}`}>
            {dateFormatted}
          </span>
        </div>
      </div>

      {/* Amount */}
      <span className="expense-amount" aria-label={`Amount: ${amountFormatted}`}>
        {amountFormatted}
      </span>

      {/* Delete */}
      <button
        className="expense-delete-btn"
        onClick={handleDelete}
        disabled={deleting}
        aria-label={`Delete expense: ${expense.description}`}
        title="Delete"
      >
        {deleting ? "⏳" : "✕"}
      </button>
    </li>
  );
}
