import React, { FC } from 'react';
import { Card, Group, Text } from '@mantine/core';
import { useDownloadUrl } from '@/hooks/useDownloadUrl';
import useStore from '@/store';
import { AspectImg } from '@/features/postList/components/AspectImg';

type Props = {
  title: string;
  imgUrl?: string;
  position: {
    lat: string;
    lng: string;
  } | null;
  BusinessDay: JSX.Element[];
  EditAction?: JSX.Element;
};

export const PostItem: FC<Props> = ({
  title,
  imgUrl = '',
  BusinessDay,
  EditAction,
  position,
}) => {
  const setPosition = useStore((state) => state.setPosition);
  const { fullUrl: postUrl } = useDownloadUrl(imgUrl, 'posts');

  const onClickCard = (position: { lat: string; lng: string } | null) => {
    if (position !== null) {
      setPosition({ lat: Number(position.lat), lng: Number(position.lng) });
    }
  };

  return (
    <Card
      shadow='sm'
      p='lg'
      radius='md'
      withBorder
      onClick={() => onClickCard(position)}
    >
      <Card.Section>
        <AspectImg imgUrl={postUrl} />
      </Card.Section>
      <Text size='xl' weight={500}>
        {title}
      </Text>
      <Group>
        <Text size='sm'>営業日</Text>
        {BusinessDay}
      </Group>
      {EditAction}
    </Card>
  );
};
