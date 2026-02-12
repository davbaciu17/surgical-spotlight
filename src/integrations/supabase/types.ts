export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string | null
          full_name?: string | null
          company_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      surgical_scans: {
        Row: {
          id: string
          user_id: string
          request_id: string
          business_name: string
          niche: string
          website: string
          target_market: string
          ideal_client: string
          competition: string
          status: string
          surgical_score: number | null
          grade: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          request_id: string
          business_name: string
          niche: string
          website: string
          target_market: string
          ideal_client: string
          competition: string
          status?: string
          surgical_score?: number | null
          grade?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: string
          surgical_score?: number | null
          grade?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      surgical_queries: {
        Row: {
          id: string
          request_id: string
          query_number: number | null
          category: string | null
          query_text: string | null
          mentions_business: boolean | null
          sentiment: string | null
          position_rank: number | null
          surgical_score_contribution: number | null
          llm_response: string | null
          user_id: string | null
          business_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          request_id: string
          query_number?: number | null
          category?: string | null
          query_text?: string | null
          mentions_business?: boolean | null
          sentiment?: string | null
          position_rank?: number | null
          surgical_score_contribution?: number | null
          llm_response?: string | null
          user_id?: string | null
          business_id?: string | null
        }
        Update: {
          query_number?: number | null
          category?: string | null
          query_text?: string | null
          mentions_business?: boolean | null
          sentiment?: string | null
          position_rank?: number | null
          surgical_score_contribution?: number | null
          llm_response?: string | null
          user_id?: string | null
          business_id?: string | null
        }
        Relationships: []
      }
      surgical_results: {
        Row: {
          id: string
          request_id: string
          surgical_score: number | null
          grade: string | null
          total_mentioned: number | null
          total_recommended: number | null
          top_competitors: Json | null
          category_scores: Json | null
          user_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          request_id: string
          surgical_score?: number | null
          grade?: string | null
          total_mentioned?: number | null
          total_recommended?: number | null
          top_competitors?: Json | null
          category_scores?: Json | null
          user_id?: string | null
        }
        Update: {
          surgical_score?: number | null
          grade?: string | null
          total_mentioned?: number | null
          total_recommended?: number | null
          top_competitors?: Json | null
          category_scores?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
