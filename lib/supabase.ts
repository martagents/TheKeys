import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for the five pillars
export type PillarType = 'sharp' | 'fitness' | 'presence' | 'temple' | 'warrior'

export interface HabitLog {
  id: string
  user_id: string
  pillar: PillarType
  habit_name: string
  completed: boolean
  date: string
  created_at: string
}

export interface Weight {
  id: string
  user_id: string
  weight: number
  date: string
  created_at: string
}

export interface Spark {
  id: string
  user_id: string
  item: string
  purchased: boolean
  photo_url?: string
  created_at: string
}

export interface System {
  id: string
  user_id: string
  content: string
  created_at: string
}
