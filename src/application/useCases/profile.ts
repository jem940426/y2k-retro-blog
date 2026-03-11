import { Profile } from '@/domain/models/Profile';
import { getSupabaseClient } from '@/infrastructure/supabase/client';

export const getProfile = async (): Promise<Profile | null> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', 1)
    .single();

  if (error || !data) return null;
  return data as Profile;
};

export const updateProfile = async (
  nickname: string, 
  tmi: string, 
  emoji: string
): Promise<{ success: boolean; error?: any }> => {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('profile')
    .update({ nickname, tmi, emoji })
    .eq('id', 1);

  if (error) return { success: false, error };
  return { success: true };
};
