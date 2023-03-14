import router from 'next/router';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import useStore from '@/store';
import { Post, EditedPost } from '@/types';
import { notification } from '@/utils/notification';
import { supabase } from '@/utils/supabase';

export const useMutatePost: () => {
  deletePostMutation: UseMutationResult<undefined[], any, string, unknown>;
  createPostMutation: UseMutationResult<
    undefined[],
    any,
    Omit<Post, 'id' | 'created_at'>,
    unknown
  >;
  updatePostMutation: UseMutationResult<undefined[], any, EditedPost, unknown>;
} = () => {
  const queryClient = useQueryClient();

  const reset = useStore((state) => state.resetEditedPost);
  const initializePosition = useStore((state) => state.initializePosition);
  const createPostMutation = useMutation(
    async (post: Omit<Post, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('posts').insert(post);
      if (error) throw new Error(error.message);

      return data;
    },
    {
      onSuccess: () => {
        initializePosition();
        reset();
        notification();
        router.push('/post');
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      },
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const updatePostMutation = useMutation(
    async (post: EditedPost) => {
      const { data, error } = await supabase
        .from('posts')
        .update({ title: post.title, post_url: post.post_url })
        .eq('id', post.id);
      if (error) throw new Error(error.message);

      return data;
    },
    {
      onSuccess: () => {
        reset();
      },
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const deletePostMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      if (error) throw new Error(error.message);

      return data;
    },
    {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      },
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  return { deletePostMutation, createPostMutation, updatePostMutation };
};
