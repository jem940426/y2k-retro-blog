import { createBrowserClient } from '@supabase/ssr';

// 불필요한 인스턴스 중복 생성을 막기 위한 싱글톤 패턴 적용
let supabaseInstance: any = null;

// 데이터 액세스 계층에서 호출하여 사용할 Supabase 클라이언트 생성 함수
export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase 환경 변수가 누락되었습니다. .env 파일을 확인해 주세요.');
    }

    supabaseInstance = createBrowserClient(
      supabaseUrl || 'https://placeholder.supabase.co', 
      supabaseAnonKey || 'placeholder'
    );
  }
  
  return supabaseInstance;
};
