import { supabase } from "@/lib/supabase";
import type { CreateExpenseInput, Expense } from "@/types/expense";

const TABLE = "expenses";

/**
 * Fetch all expenses, newest first.
 */
export async function fetchExpenses(): Promise<Expense[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch expenses: ${error.message}`);
  }

  return data as Expense[];
}

/**
 * Create a new expense and return the inserted row.
 * The `input.amount` string is coerced to a float before insertion.
 */
export async function createExpense(input: CreateExpenseInput): Promise<Expense> {
  const payload = {
    category: input.category,
    description: input.description.trim(),
    amount: parseFloat(input.amount),
  };

  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create expense: ${error.message}`);
  }

  return data as Expense;
}

/**
 * Delete an expense by its primary key.
 */
export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete expense: ${error.message}`);
  }
}
