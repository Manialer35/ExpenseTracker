"use client";

// Force dynamic rendering — this page fetches live data from Supabase
// and must never be statically pre-rendered at build time.
export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from "react";
import type { CreateExpenseInput, Expense } from "@/types/expense";
import { fetchExpenses, createExpense, deleteExpense } from "@/lib/expenses";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Load expenses on mount ──────────────────────────────────────────────────
  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading expenses."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  // ── Create expense ──────────────────────────────────────────────────────────
  const handleCreate = useCallback(async (input: CreateExpenseInput) => {
    setError(null);
    const newExpense = await createExpense(input);
    // Optimistically prepend so the list stays sorted newest-first
    setExpenses((prev) => [newExpense, ...prev]);
  }, []);

  // ── Delete expense ──────────────────────────────────────────────────────────
  const handleDelete = useCallback(async (id: string) => {
    setError(null);
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <header className="header">
          <div className="header-inner">
            <div className="header-icon" aria-hidden="true">💳</div>
            <div>
              <h1 className="header-title">Expense Tracker</h1>
              <p className="header-subtitle">Keep your spending in check</p>
            </div>
          </div>
        </header>

        <main className="main-content">
          {/* ── Error Banner ───────────────────────────────────────────── */}
          {error && (
            <div
              className="error-banner"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <span className="error-banner-icon" aria-hidden="true">⚠️</span>
              <div className="error-banner-content">
                <p className="error-banner-title">Something went wrong</p>
                <p className="error-banner-message">{error}</p>
              </div>
            </div>
          )}

          {/* ── Summary ────────────────────────────────────────────────── */}
          <ExpenseSummary expenses={expenses} loading={loading} />

          {/* ── Form ───────────────────────────────────────────────────── */}
          <ExpenseForm onSubmit={handleCreate} />

          {/* ── List ───────────────────────────────────────────────────── */}
          <ExpenseList
            expenses={expenses}
            loading={loading}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
}
