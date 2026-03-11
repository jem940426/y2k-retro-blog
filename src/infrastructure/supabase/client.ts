import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 환경 변수 검증 및 반환을 위한 안전한 래퍼 함수
const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    // throw new Error(`${key} 환경 변수가 누락되었습니다. .env 파일을 확인해 주세요.`);
    console.warn(`${key} 환경 변수가 누락되었습니다. .env 파일을 확인해 주세요.`);
    return '';
  }
  return value;
};

const supabaseUrl: string = getEnvVariable('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey: string = getEnvVariable('NEXT_PUBLIC_SUPABASE_ANON_KEY');

// 불필요한 인스턴스 중복 생성을 막기 위한 싱글톤 패턴 적용
let supabaseInstance: SupabaseClient | null = null;

// 데이터 액세스 계층에서 호출하여 사용할 Supabase 클라이언트 생성 함수
export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');
  }
  
  return supabaseInstance;
};
