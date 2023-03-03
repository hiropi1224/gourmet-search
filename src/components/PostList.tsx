import React, { FC } from 'react';
import { SimpleGrid } from '@mantine/core';
import { useQueryPosts } from '@/hooks/useQueryPosts';
import { PostItem } from '@/components/PostItem';

export const PostList: FC = () => {
  const { data: posts } = useQueryPosts();

  return (
    <div>
      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 2 },
          { minWidth: 'md', cols: 3 },
          { minWidth: 1200, cols: 4 },
        ]}
      >
        {posts?.map((post) => (
          <PostItem key={post.id} postItem={post} />
        ))}
      </SimpleGrid>
    </div>
  );
};
