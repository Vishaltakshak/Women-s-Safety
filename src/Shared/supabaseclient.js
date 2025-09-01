// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wrbhfhdvcsujeehmpwvm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyYmhmaGR2Y3N1amVlaG1wd3ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDI4OTAsImV4cCI6MjA2OTg3ODg5MH0.WEO1tpHkB1VE2q3xjQrvaG6x9tKv7lriuzT25hxPFhs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
