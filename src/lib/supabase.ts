import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
  throw new Error(
    'VITE_SUPABASE_URL is not configured. Please set it to your actual Supabase project URL in the .env file. ' +
    'Example: VITE_SUPABASE_URL=https://your-project.supabase.co'
  );
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key') {
  throw new Error(
    'VITE_SUPABASE_ANON_KEY is not configured. Please set it to your actual Supabase anonymous key in the .env file.'
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch {
  throw new Error(
    `VITE_SUPABASE_URL is not a valid URL: "${supabaseUrl}". ` +
    'Please ensure it follows the format: https://your-project.supabase.co'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);