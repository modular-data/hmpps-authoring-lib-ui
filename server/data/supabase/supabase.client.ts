import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface SupabaseClientConfig {
  url: string
  anonKey: string
}

export const createSupabaseClient = ({ url, anonKey }: SupabaseClientConfig): SupabaseClient => {
  return createClient(url, anonKey)
}
