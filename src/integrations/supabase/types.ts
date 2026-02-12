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
          plan_tier: string | null
          stripe_customer_id: string | null
          subscription_status: string | null
          subscription_end_date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          company_name?: string | null
          plan_tier?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          subscription_end_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          full_name?: string | null
          company_name?: string | null
          plan_tier?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          subscription_end_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      businesses: {
        Row: {
          id: string
          user_id: string
          name: string
          website: string | null
          niche: string
          target_market: string
          ideal_client: string | null
          competition: string | null
          is_active: boolean | null
          last_scanned_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          website?: string | null
          niche: string
          target_market: string
          ideal_client?: string | null
          competition?: string | null
          is_active?: boolean | null
          last_scanned_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          name?: string
          website?: string | null
          niche?: string
          target_market?: string
          ideal_client?: string | null
          competition?: string | null
          is_active?: boolean | null
          last_scanned_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scan_runs: {
        Row: {
          id: string
          request_id: string
          business_id: string | null
          user_id: string
          run_type: string | null
          status: string | null
          queries_tested: number | null
          queries_total: number | null
          error_message: string | null
          started_at: string | null
          completed_at: string | null
          created_at: string | null
          business_name: string | null
          niche: string | null
          website: string | null
          target_market: string | null
          ideal_client: string | null
          competition: string | null
          surgical_score: number | null
          grade: string | null
        }
        Insert: {
          id?: string
          request_id: string
          business_id?: string | null
          user_id: string
          run_type?: string | null
          status?: string | null
          queries_tested?: number | null
          queries_total?: number | null
          error_message?: string | null
          started_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          business_name?: string | null
          niche?: string | null
          website?: string | null
          target_market?: string | null
          ideal_client?: string | null
          competition?: string | null
          surgical_score?: number | null
          grade?: string | null
        }
        Update: {
          status?: string | null
          queries_tested?: number | null
          queries_total?: number | null
          error_message?: string | null
          completed_at?: string | null
          business_name?: string | null
          niche?: string | null
          website?: string | null
          target_market?: string | null
          ideal_client?: string | null
          competition?: string | null
          surgical_score?: number | null
          grade?: string | null
        }
        Relationships: []
      }
      surgical_queries: {
        Row: {
          id: string
          request_id: string
          business_name: string
          query_number: number
          query_type: string
          query_text: string
          llm_response: string | null
          mentions_business: string | null
          sentiment: string | null
          position_rank: number | null
          surgical_score_contribution: number | null
          business_id: string | null
          user_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          request_id: string
          business_name: string
          query_number: number
          query_type: string
          query_text: string
          llm_response?: string | null
          mentions_business?: string | null
          sentiment?: string | null
          position_rank?: number | null
          surgical_score_contribution?: number | null
          business_id?: string | null
          user_id?: string | null
        }
        Update: {
          llm_response?: string | null
          mentions_business?: string | null
          sentiment?: string | null
          position_rank?: number | null
          surgical_score_contribution?: number | null
          business_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      surgical_results: {
        Row: {
          id: string
          request_id: string
          business_name: string
          surgical_score: number
          grade: string
          category_breakdown: Json
          top_competitors: Json | null
          total_mentioned: number | null
          total_recommended: number | null
          business_id: string | null
          user_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          request_id: string
          business_name: string
          surgical_score: number
          grade: string
          category_breakdown: Json
          top_competitors?: Json | null
          total_mentioned?: number | null
          total_recommended?: number | null
          business_id?: string | null
          user_id?: string | null
        }
        Update: {
          surgical_score?: number
          grade?: string
          category_breakdown?: Json
          top_competitors?: Json | null
          total_mentioned?: number | null
          total_recommended?: number | null
          business_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_snapshots: {
        Row: {
          id: string
          business_id: string
          snapshot_date: string
          llm_provider: string
          surgical_score: number | null
          grade: string | null
          visibility_percentage: number | null
          total_queries_tested: number | null
          total_mentioned: number | null
          total_recommended: number | null
          positive_sentiment_count: number | null
          neutral_sentiment_count: number | null
          negative_sentiment_count: number | null
          top_competitors: Json | null
          request_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          business_id: string
          snapshot_date: string
          llm_provider?: string
          surgical_score?: number | null
          grade?: string | null
          visibility_percentage?: number | null
          total_queries_tested?: number | null
          total_mentioned?: number | null
          total_recommended?: number | null
          positive_sentiment_count?: number | null
          neutral_sentiment_count?: number | null
          negative_sentiment_count?: number | null
          top_competitors?: Json | null
          request_id?: string | null
        }
        Update: {
          surgical_score?: number | null
          grade?: string | null
          visibility_percentage?: number | null
          total_queries_tested?: number | null
          total_mentioned?: number | null
          total_recommended?: number | null
          positive_sentiment_count?: number | null
          neutral_sentiment_count?: number | null
          negative_sentiment_count?: number | null
          top_competitors?: Json | null
          request_id?: string | null
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
