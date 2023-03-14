import React, { FC, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { usePostListView } from '@/features/postList/hooks/usePostListView';
import { Post } from '@/types';
import { PostListTemplate } from '@/features/postList/components/PostList/PostListTemplate';

type Props = {
  posts: Post[];
  session: Session;
};

export const PostList: FC<Props> = ({ posts, session = null }) => {
  const {
    update,
    deletePostMutation,
    initializePosition,
    setFilterDay,
    filterPost,
  } = usePostListView(posts);

  useEffect(() => {
    initializePosition();
  }, [initializePosition]);

  if (posts === undefined || session === null) return null;

  return (
    <PostListTemplate
      posts={filterPost}
      session={session}
      update={update}
      deletePostMutation={deletePostMutation}
      onChange={setFilterDay}
    />
  );
};
