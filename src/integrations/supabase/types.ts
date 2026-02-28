export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      analytics_snapshots: {
        Row: {
          business_id: string | null
          created_at: string | null
          grade: string | null
          id: string
          llm_provider: string
          negative_sentiment_count: number | null
          neutral_sentiment_count: number | null
          positive_sentiment_count: number | null
          request_id: string | null
          snapshot_date: string
          surgical_score: number | null
          top_competitors: Json | null
          total_mentioned: number | null
          total_queries_tested: number | null
          total_recommended: number | null
          visibility_percentage: number | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          grade?: string | null
          id?: string
          llm_provider?: string
          negative_sentiment_count?: number | null
          neutral_sentiment_count?: number | null
          positive_sentiment_count?: number | null
          request_id?: string | null
          snapshot_date: string
          surgical_score?: number | null
          top_competitors?: Json | null
          total_mentioned?: number | null
          total_queries_tested?: number | null
          total_recommended?: number | null
          visibility_percentage?: number | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          grade?: string | null
          id?: string
          llm_provider?: string
          negative_sentiment_count?: number | null
          neutral_sentiment_count?: number | null
          positive_sentiment_count?: number | null
          request_id?: string | null
          snapshot_date?: string
          surgical_score?: number | null
          top_competitors?: Json | null
          total_mentioned?: number | null
          total_queries_tested?: number | null
          total_recommended?: number | null
          visibility_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_snapshots_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          competition: string | null
          created_at: string | null
          id: string
          ideal_client: string | null
          is_active: boolean | null
          last_scanned_at: string | null
          name: string
          niche: string
          target_market: string
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          competition?: string | null
          created_at?: string | null
          id?: string
          ideal_client?: string | null
          is_active?: boolean | null
          last_scanned_at?: string | null
          name: string
          niche: string
          target_market: string
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          competition?: string | null
          created_at?: string | null
          id?: string
          ideal_client?: string | null
          is_active?: boolean | null
          last_scanned_at?: string | null
          name?: string
          niche?: string
          target_market?: string
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_pieces: {
        Row: {
          ai_citation_score: number | null
          answer_capsule: string | null
          body_html: string | null
          body_text: string | null
          business_id: string | null
          content_type: string | null
          created_at: string | null
          day_number: number | null
          hero_image_url: string | null
          id: string
          key_phrases: string[] | null
          keyword_difficulty: number | null
          meta_description: string | null
          pillar: string | null
          plan_id: string | null
          priority: string | null
          publish_date: string | null
          published_at: string | null
          published_url: string | null
          schema_json: Json | null
          score_breakdown: Json | null
          search_volume: number | null
          slug: string | null
          status: string | null
          strategy: string | null
          target_queries_text: string[] | null
          target_query_ids: string[] | null
          title: string
          unique_angle: string | null
          updated_at: string | null
          word_count: number | null
        }
        Insert: {
          ai_citation_score?: number | null
          answer_capsule?: string | null
          body_html?: string | null
          body_text?: string | null
          business_id?: string | null
          content_type?: string | null
          created_at?: string | null
          day_number?: number | null
          hero_image_url?: string | null
          id?: string
          key_phrases?: string[] | null
          keyword_difficulty?: number | null
          meta_description?: string | null
          pillar?: string | null
          plan_id?: string | null
          priority?: string | null
          publish_date?: string | null
          published_at?: string | null
          published_url?: string | null
          schema_json?: Json | null
          score_breakdown?: Json | null
          search_volume?: number | null
          slug?: string | null
          status?: string | null
          strategy?: string | null
          target_queries_text?: string[] | null
          target_query_ids?: string[] | null
          title: string
          unique_angle?: string | null
          updated_at?: string | null
          word_count?: number | null
        }
        Update: {
          ai_citation_score?: number | null
          answer_capsule?: string | null
          body_html?: string | null
          body_text?: string | null
          business_id?: string | null
          content_type?: string | null
          created_at?: string | null
          day_number?: number | null
          hero_image_url?: string | null
          id?: string
          key_phrases?: string[] | null
          keyword_difficulty?: number | null
          meta_description?: string | null
          pillar?: string | null
          plan_id?: string | null
          priority?: string | null
          publish_date?: string | null
          published_at?: string | null
          published_url?: string | null
          schema_json?: Json | null
          score_breakdown?: Json | null
          search_volume?: number | null
          slug?: string | null
          status?: string | null
          strategy?: string | null
          target_queries_text?: string[] | null
          target_query_ids?: string[] | null
          title?: string
          unique_angle?: string | null
          updated_at?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_pieces_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_pieces_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "content_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      content_plans: {
        Row: {
          ascensiune_count: number | null
          business_id: string | null
          captura_count: number | null
          competitie_count: number | null
          created_at: string | null
          current_avg_position: number | null
          current_mention_rate: number | null
          current_score: number | null
          current_sentiment_rate: number | null
          estimated_avg_position: number | null
          estimated_mention_rate: number | null
          estimated_score: number | null
          estimated_sentiment_rate: number | null
          id: string
          posts_published: number | null
          scan_run_id: string | null
          sentiment_count: number | null
          status: string | null
          total_posts: number | null
          updated_at: string | null
        }
        Insert: {
          ascensiune_count?: number | null
          business_id?: string | null
          captura_count?: number | null
          competitie_count?: number | null
          created_at?: string | null
          current_avg_position?: number | null
          current_mention_rate?: number | null
          current_score?: number | null
          current_sentiment_rate?: number | null
          estimated_avg_position?: number | null
          estimated_mention_rate?: number | null
          estimated_score?: number | null
          estimated_sentiment_rate?: number | null
          id?: string
          posts_published?: number | null
          scan_run_id?: string | null
          sentiment_count?: number | null
          status?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Update: {
          ascensiune_count?: number | null
          business_id?: string | null
          captura_count?: number | null
          competitie_count?: number | null
          created_at?: string | null
          current_avg_position?: number | null
          current_mention_rate?: number | null
          current_score?: number | null
          current_sentiment_rate?: number | null
          estimated_avg_position?: number | null
          estimated_mention_rate?: number | null
          estimated_score?: number | null
          estimated_sentiment_rate?: number | null
          id?: string
          posts_published?: number | null
          scan_run_id?: string | null
          sentiment_count?: number | null
          status?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_plans_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_plans_scan_run_id_fkey"
            columns: ["scan_run_id"]
            isOneToOne: false
            referencedRelation: "scan_history"
            referencedColumns: ["scan_run_id"]
          },
          {
            foreignKeyName: "content_plans_scan_run_id_fkey"
            columns: ["scan_run_id"]
            isOneToOne: false
            referencedRelation: "scan_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          plan_tier: string | null
          stripe_customer_id: string | null
          subscription_end_date: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          plan_tier?: string | null
          stripe_customer_id?: string | null
          subscription_end_date?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          plan_tier?: string | null
          stripe_customer_id?: string | null
          subscription_end_date?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      query_content_map: {
        Row: {
          content_piece_id: string | null
          created_at: string | null
          id: string
          post_mentioned: string | null
          post_position: number | null
          post_sentiment: string | null
          pre_mentioned: string | null
          pre_position: number | null
          pre_sentiment: string | null
          query_result_id: string | null
          strategy: string | null
        }
        Insert: {
          content_piece_id?: string | null
          created_at?: string | null
          id?: string
          post_mentioned?: string | null
          post_position?: number | null
          post_sentiment?: string | null
          pre_mentioned?: string | null
          pre_position?: number | null
          pre_sentiment?: string | null
          query_result_id?: string | null
          strategy?: string | null
        }
        Update: {
          content_piece_id?: string | null
          created_at?: string | null
          id?: string
          post_mentioned?: string | null
          post_position?: number | null
          post_sentiment?: string | null
          pre_mentioned?: string | null
          pre_position?: number | null
          pre_sentiment?: string | null
          query_result_id?: string | null
          strategy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "query_content_map_content_piece_id_fkey"
            columns: ["content_piece_id"]
            isOneToOne: false
            referencedRelation: "content_pieces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "query_content_map_query_result_id_fkey"
            columns: ["query_result_id"]
            isOneToOne: false
            referencedRelation: "surgical_queries"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_runs: {
        Row: {
          business_id: string | null
          business_name: string | null
          competition: string | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          grade: string | null
          id: string
          ideal_client: string | null
          niche: string | null
          queries_tested: number | null
          queries_total: number | null
          request_id: string
          run_type: string | null
          started_at: string | null
          status: string | null
          surgical_score: number | null
          target_market: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          business_id?: string | null
          business_name?: string | null
          competition?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          grade?: string | null
          id?: string
          ideal_client?: string | null
          niche?: string | null
          queries_tested?: number | null
          queries_total?: number | null
          request_id: string
          run_type?: string | null
          started_at?: string | null
          status?: string | null
          surgical_score?: number | null
          target_market?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          business_id?: string | null
          business_name?: string | null
          competition?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          grade?: string | null
          id?: string
          ideal_client?: string | null
          niche?: string | null
          queries_tested?: number | null
          queries_total?: number | null
          request_id?: string
          run_type?: string | null
          started_at?: string | null
          status?: string | null
          surgical_score?: number | null
          target_market?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scan_runs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      surgical_queries: {
        Row: {
          business_id: string | null
          business_name: string
          created_at: string | null
          id: string
          llm_response: string | null
          mentions_business: string | null
          position_rank: number | null
          query_number: number
          query_text: string
          query_type: string
          request_id: string
          sentiment: string | null
          surgical_score_contribution: number | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          business_name: string
          created_at?: string | null
          id?: string
          llm_response?: string | null
          mentions_business?: string | null
          position_rank?: number | null
          query_number: number
          query_text: string
          query_type: string
          request_id: string
          sentiment?: string | null
          surgical_score_contribution?: number | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          business_name?: string
          created_at?: string | null
          id?: string
          llm_response?: string | null
          mentions_business?: string | null
          position_rank?: number | null
          query_number?: number
          query_text?: string
          query_type?: string
          request_id?: string
          sentiment?: string | null
          surgical_score_contribution?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      surgical_results: {
        Row: {
          business_id: string | null
          business_name: string
          category_breakdown: Json
          created_at: string | null
          grade: string
          id: string
          request_id: string
          surgical_score: number
          top_competitors: Json | null
          total_mentioned: number | null
          total_recommended: number | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          business_name: string
          category_breakdown: Json
          created_at?: string | null
          grade: string
          id?: string
          request_id: string
          surgical_score: number
          top_competitors?: Json | null
          total_mentioned?: number | null
          total_recommended?: number | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          business_name?: string
          category_breakdown?: Json
          created_at?: string | null
          grade?: string
          id?: string
          request_id?: string
          surgical_score?: number
          top_competitors?: Json | null
          total_mentioned?: number | null
          total_recommended?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_config: {
        Row: {
          description: string | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
    }
    Views: {
      latest_scan_per_business: {
        Row: {
          business_id: string | null
          business_name: string | null
          category_breakdown: Json | null
          grade: string | null
          request_id: string | null
          scanned_at: string | null
          surgical_score: number | null
          top_competitors: Json | null
          total_mentioned: number | null
          total_recommended: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_history: {
        Row: {
          business_id: string | null
          business_name: string | null
          completed_at: string | null
          grade: string | null
          queries_tested: number | null
          queries_total: number | null
          request_id: string | null
          scan_run_id: string | null
          started_at: string | null
          status: string | null
          surgical_score: number | null
          total_mentioned: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scan_runs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
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
