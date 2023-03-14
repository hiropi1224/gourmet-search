import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Post } from '@/types';
import { supabase } from '@/utils/supabase';

export const useQueryPosts: () => UseQueryResult<Post[], Error> = () => {
  const getPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: Infinity,
  });
};
