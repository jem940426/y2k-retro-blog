import { Category } from '@/domain/models/Category';
import { getSupabaseClient } from '@/infrastructure/supabase/client';

export const getCategories = async (): Promise<Category[]> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });

  if (error || !data) return [];
  return data as Category[];
};

export const addCategory = async (name: string, icon: string): Promise<{ success: boolean; error?: any }> => {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('categories')
    .insert([{ name, icon }]);

  if (error) return { success: false, error };
  return { success: true };
};

export const deleteCategory = async (id: string): Promise<{ success: boolean; error?: any }> => {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) return { success: false, error };
  return { success: true };
};
