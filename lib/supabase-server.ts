import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseAdmin = ((): any => {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase server client not configured - missing env vars')
    return null
  }
  return createClient(supabaseUrl, supabaseServiceKey)
})()
