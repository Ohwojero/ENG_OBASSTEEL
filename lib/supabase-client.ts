import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = ((): any => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase client not configured - missing env vars')
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
})()
