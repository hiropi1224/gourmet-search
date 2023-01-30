import React, { FC } from 'react';
import { LogoutIcon } from '@heroicons/react/outline';
import { useQueryPosts } from '@/hooks/useQueryPosts';
import { supabase } from '@/utils/supabase';
import { PostItem } from '@/components/PostItem';

export const PostList: FC = () => {
  const signOut = () => {
    supabase.auth.signOut();
  };
  const { data: posts } = useQueryPosts();

  return (
    <div>
      <LogoutIcon
        data-testid='logout'
        className='my-6 h-6 w-6 cursor-pointer text-blue-500'
        onClick={signOut}
      />
      <ul data-testid='ul-post' className='my-5'>
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            post_url={post.post_url}
            user_id={post.user_id}
          />
        ))}
      </ul>
    </div>
  );
};
