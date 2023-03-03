import React, { FC } from 'react';
import { Card, Group, Text } from '@mantine/core';
import { AspectImg } from '@/components/features/PostList/AspectImg';

type Props = {
  title: string;
  imgUrl?: string;
  onClickCard: () => void;
  BusinessDay: JSX.Element;
  EditAction?: JSX.Element;
};

export const PostItem: FC<Props> = ({
  title,
  imgUrl = '',
  onClickCard,
  BusinessDay,
  EditAction,
}) => {
  return (
    <Card shadow='sm' p='lg' radius='md' withBorder onClick={onClickCard}>
      <Card.Section>
        <AspectImg imgUrl={imgUrl} />
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
