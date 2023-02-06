import React, { Dispatch, FC, SetStateAction } from 'react';
import { SimpleGrid } from '@mantine/core';
import { useQueryPosts } from '@/hooks/useQueryPosts';
import { PostItem } from '@/components/PostItem';

type Props = {
  setPosition: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
};

export const PostList: FC<Props> = ({ setPosition }) => {
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
          <PostItem key={post.id} postItem={post} setPosition={setPosition} />
        ))}
      </SimpleGrid>
    </div>
  );
};
