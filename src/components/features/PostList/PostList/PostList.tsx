import React, { FC } from 'react';
import { SimpleGrid } from '@mantine/core';
import { Post } from '@/types';
import { PostItem } from '@/components/PostItem';

type Props = {
  posts: Post[];
};

export const PostList: FC<Props> = ({ posts }) => {
  if (posts === undefined) return null;

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
