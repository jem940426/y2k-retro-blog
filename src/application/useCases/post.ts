import { getSupabaseClient } from '@/infrastructure/supabase/client';

export const uploadMedia = async (file: File): Promise<string | null> => {
  try {
    const supabase = getSupabaseClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `post-media/${fileName}`;

    const { error } = await supabase.storage
      .from('blog-media')
      .upload(filePath, file);

    if (error) {
      console.error('Upload Error:', error);
      return null;
    }

    const { data } = supabase.storage
      .from('blog-media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const savePost = async (title: string, content: string, category: string, emoji: string) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .insert([
      { title, content, category, emoji }
    ]);
  
  return { data, error };
};

export const updatePost = async (id: string, title: string, content: string, category: string, emoji: string) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .update({ title, content, category, emoji })
    .eq('id', id);
  
  return { data, error };
};

export const deletePost = async (id: string) => {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  
  return { error };
};
