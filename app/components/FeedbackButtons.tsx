// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Supabase 인스턴스 생성
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ✅ 이 부분이 핵심
// createClient 자체를 export하지 말고, supabase만 export해야 함
export { supabase }

