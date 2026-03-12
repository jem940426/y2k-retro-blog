import { Post } from '@/domain/models/Post';
import { getSupabaseClient } from '@/infrastructure/supabase/client';

export const getPosts = async (): Promise<Post[]> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error || !data) return [];
  
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    category: item.category,
    // DB에서 저장된 created_at 값을 날짜 형태로 파싱
    date: new Date(item.created_at).toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    }),
    emoji: item.emoji || '📝'
  }));
};

export const getPostsByCategory = async (categoryName: string): Promise<Post[]> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', categoryName)
    .order('created_at', { ascending: false });
    
  if (error || !data) return [];
  
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    category: item.category,
    date: new Date(item.created_at).toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    }),
    emoji: item.emoji || '📝'
  }));
};

export const getPost = async (id: string): Promise<Post | null> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    category: data.category,
    date: new Date(data.created_at).toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    }),
    emoji: data.emoji || '📝'
  };
};
