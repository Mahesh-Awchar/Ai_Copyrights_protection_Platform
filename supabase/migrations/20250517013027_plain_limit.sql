/*
  # Create verifications table

  1. New Tables
    - `verifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `file_name` (text)
      - `file_type` (text)
      - `ipfs_url` (text)
      - `transaction_hash` (text)
      - `verification_date` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `verifications` table
    - Add policies for authenticated users to:
      - Insert their own verifications
      - Read their own verifications
*/

CREATE TABLE IF NOT EXISTS verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  file_name text NOT NULL,
  file_type text NOT NULL,
  ipfs_url text NOT NULL,
  transaction_hash text NOT NULL,
  verification_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own verifications"
  ON verifications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own verifications"
  ON verifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);