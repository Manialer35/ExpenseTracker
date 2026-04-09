-- ============================================================
-- Expense Tracker — Supabase SQL Schema
-- ============================================================
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor).
-- ============================================================

-- 1. Enum for expense categories
--    Sync with src/types/expense.ts → ExpenseCategory
CREATE TYPE expense_category AS ENUM (
  'Food & Dining',
  'Transportation',
  'Housing',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Other'
);

-- 2. Main expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category    expense_category NOT NULL,
  amount      NUMERIC(12, 2)   NOT NULL CHECK (amount > 0),
  description TEXT             NOT NULL CHECK (char_length(description) BETWEEN 1 AND 200),
  created_at  TIMESTAMPTZ      NOT NULL DEFAULT now()
);

-- 3. Index for chronological queries (most common query pattern)
CREATE INDEX IF NOT EXISTS idx_expenses_created_at
  ON expenses (created_at DESC);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
-- Enable RLS so the anon key can only perform safe operations.
-- For a personal/demo app this allows all anon access;
-- replace with auth.uid() scoping for user-specific data.

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read all rows (demo-friendly)
CREATE POLICY "Allow anon read"
  ON expenses FOR SELECT
  USING (true);

-- Allow anyone to insert rows (demo-friendly)
CREATE POLICY "Allow anon insert"
  ON expenses FOR INSERT
  WITH CHECK (true);

-- Allow anyone to delete rows (demo-friendly)
CREATE POLICY "Allow anon delete"
  ON expenses FOR DELETE
  USING (true);

-- ============================================================
-- Sample seed data (optional — remove before production)
-- ============================================================
-- INSERT INTO expenses (category, amount, description) VALUES
--   ('Food & Dining',   12.50, 'Lunch at the office canteen'),
--   ('Transportation',  45.00, 'Monthly bus pass'),
--   ('Entertainment',   15.99, 'Netflix subscription'),
--   ('Healthcare',      80.00, 'GP consultation fee'),
--   ('Shopping',       120.00, 'New running shoes');
