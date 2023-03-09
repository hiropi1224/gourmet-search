import React, { FC } from 'react';
import { usePostContentView } from '@/features/postList/hooks/usePostContentView';
import { LatLng } from '@/features/postList/types';
import { PostContentTemplate } from '@/features/postList/components/PostContent/PostContentTemplate';

type Props = {
  title: string;
  postUrl: string;
  businessDay: string[];
  position: LatLng | null;
  children: JSX.Element;
};

export const PostContent: FC<Props> = ({
  title,
  postUrl,
  businessDay,
  position,
  children = <></>,
}) => {
  const { image, BusinessDay, onClickCard } = usePostContentView(
    postUrl,
    businessDay,
    position
  );

  return (
    <PostContentTemplate
      title={title}
      image={image}
      BusinessDay={BusinessDay}
      onClickCard={onClickCard}
    >
      {children}
    </PostContentTemplate>
  );
};
