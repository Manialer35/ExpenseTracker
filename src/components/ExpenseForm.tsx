"use client";

import { useState } from "react";
import type { CreateExpenseInput, ExpenseValidationErrors } from "@/types/expense";
import { EXPENSE_CATEGORIES } from "@/types/expense";
import { validateExpenseInput, isValid } from "@/lib/validation";

interface ExpenseFormProps {
  onSubmit: (input: CreateExpenseInput) => Promise<void>;
}

const EMPTY_FORM: CreateExpenseInput = {
  category: "",
  description: "",
  amount: "",
};

/**
 * Controlled form for adding a new expense.
 * Validates client-side before calling onSubmit.
 */
export default function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [form, setForm] = useState<CreateExpenseInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<ExpenseValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear per-field error on change
    if (errors[name as keyof ExpenseValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);

    const validationErrors = validateExpenseInput(form);
    if (!isValid(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm(EMPTY_FORM);
      setErrors({});
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card">
      <h2 className="card-title">Add Expense</h2>

      <form
        id="expense-form"
        onSubmit={handleSubmit}
        className="form"
        noValidate
        aria-label="Add a new expense"
      >
        {/* Row 1: Category + Amount */}
        <div className="form-row">
          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span aria-hidden="true">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`form-select${errors.category ? " error" : ""}`}
              disabled={submitting}
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? "category-error" : undefined}
            >
              <option value="">Select a category…</option>
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span id="category-error" className="form-error" role="alert">
                {errors.category}
              </span>
            )}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount (USD) <span aria-hidden="true">*</span>
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 25.00"
              className={`form-input${errors.amount ? " error" : ""}`}
              disabled={submitting}
              aria-invalid={!!errors.amount}
              aria-describedby={errors.amount ? "amount-error" : undefined}
            />
            {errors.amount && (
              <span id="amount-error" className="form-error" role="alert">
                {errors.amount}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description <span aria-hidden="true">*</span>
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="What was this expense for?"
            maxLength={200}
            className={`form-input${errors.description ? " error" : ""}`}
            disabled={submitting}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
          />
          {errors.description && (
            <span id="description-error" className="form-error" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          id="submit-expense"
          type="submit"
          className="btn btn-primary btn-full"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Adding…
            </>
          ) : (
            <>
              <span aria-hidden="true">+</span>
              Add Expense
            </>
          )}
        </button>

        {/* Inline success feedback */}
        {success && (
          <div className="success-toast" role="status" aria-live="polite">
            <span aria-hidden="true">✓</span>
            Expense added successfully!
          </div>
        )}
      </form>
    </div>
  );
}
