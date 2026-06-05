export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      children: {
        Row: {
          id: string
          created_at: string
          user_id: string
          first_name: string
          last_name: string
          birth_date: string
          grade_level: string
          learning_style: string | null
          interests: string[] | null
          subjects: string[] | null
          notes: string | null
          avatar_url: string | null
        }
        Insert: Omit<Database['public']['Tables']['children']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['children']['Insert']>
      }
      lessons: {
        Row: {
          id: string
          created_at: string
          child_id: string
          user_id: string
          title: string
          subject: string
          grade_level: string
          duration_minutes: number
          objectives: string[]
          content: string
          activities: string[]
          materials: string[]
          assessment: string
          status: 'draft' | 'active' | 'completed'
        }
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>
      }
    }
  }
}
