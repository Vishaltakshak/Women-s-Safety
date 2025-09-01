// utils/uploadImageToSupabase.js
import { supabase } from './supabaseclient.js'; 

export const uploadImageToSupabase = async (file, path = 'uploads/') => {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${path}${fileName}`;

  const { data, error } = await supabase.storage
    .from('womensafety') 
    .upload(filePath, file);

  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from('womensafety')
    .getPublicUrl(filePath);

  return publicUrlData?.publicUrl || null;
};
