import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = 'https://fjxbgfmeqfyzneicctxf.supabase.co';
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqeGJnZm1lcWZ5em5laWNjdHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTk2NTUsImV4cCI6MjA3NDc5NTY1NX0.21Q6pb18XC-Utlt6fm45VldHw02anELSSeGSzq9uM28';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
