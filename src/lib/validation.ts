import type {
  CreateExpenseInput,
  ExpenseValidationErrors,
} from "@/types/expense";
import { EXPENSE_CATEGORIES } from "@/types/expense";

/**
 * Validates a CreateExpenseInput object.
 *
 * Rules:
 *  - category  : required, must be one of EXPENSE_CATEGORIES
 *  - description: required, 1–200 characters
 *  - amount    : required, must be a finite number, > 0, no negatives
 *
 * @returns An error map. Empty object means validation passed.
 */
export function validateExpenseInput(
  input: CreateExpenseInput
): ExpenseValidationErrors {
  const errors: ExpenseValidationErrors = {};

  // --- Category ---
  if (!input.category || input.category.trim() === "") {
    errors.category = "Category is required.";
  } else if (!EXPENSE_CATEGORIES.includes(input.category as never)) {
    errors.category = "Please select a valid category.";
  }

  // --- Description ---
  if (!input.description || input.description.trim() === "") {
    errors.description = "Description is required.";
  } else if (input.description.trim().length > 200) {
    errors.description = "Description must not exceed 200 characters.";
  }

  // --- Amount ---
  if (!input.amount || input.amount.trim() === "") {
    errors.amount = "Amount is required.";
  } else {
    const parsed = Number(input.amount);
    if (isNaN(parsed) || !isFinite(parsed)) {
      errors.amount = "Amount must be a valid number.";
    } else if (parsed <= 0) {
      errors.amount = "Amount must be greater than zero.";
    } else if (parsed < 0) {
      // Belt-and-suspenders — already caught by <= 0 above
      errors.amount = "Amount cannot be negative.";
    }
  }

  return errors;
}

/** Returns true when the error map has zero entries. */
export function isValid(errors: ExpenseValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
