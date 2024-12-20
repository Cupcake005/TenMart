// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xashmdeipfwvynljxzdj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhc2htZGVpcGZ3dnlubGp4emRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NzEzMjEsImV4cCI6MjAzMzM0NzMyMX0.6fnQhuEGMdfNixY4LQejmu7aHrUrdGkulBVlMdgvWMg'; // Ganti dengan anon key dari Supabase

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;


