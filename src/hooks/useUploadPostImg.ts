import { FileWithPath } from '@mantine/dropzone';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import useStore from '@/store';
import { supabase } from '@/utils/supabase';

export const useUploadPostImg: () => {
  useMutateUploadPostImg: UseMutationResult<void, any, FileWithPath[], unknown>;
} = () => {
  const editedPost = useStore((state) => state.editedPost);
  const updatePost = useStore((state) => state.updateEditedPost);
  const useMutateUploadPostImg = useMutation(
    async (files: FileWithPath[]) => {
      if (files.length === 0) {
        throw new Error('Please select the image file');
      }
      const file = files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      const { error } = await supabase.storage
        .from('posts')
        .upload(filePath, file);
      if (error) throw new Error(error.message);
      updatePost({ ...editedPost, post_url: filePath });
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  return { useMutateUploadPostImg };
};
