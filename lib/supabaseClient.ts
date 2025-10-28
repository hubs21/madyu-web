// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// 환경변수에서 값 불러오기 (.env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
