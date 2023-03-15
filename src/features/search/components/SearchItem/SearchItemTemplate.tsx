import React, { FC } from 'react';
import { Card, Anchor, Badge, Image, Text } from '@mantine/core';
import { Shop } from '@/types';

type Props = {
  shop: Shop;
};

export const SearchItemTemplate: FC<Props> = ({ shop }) => {
  return (
    <Card shadow='sm' p='lg' radius='md' withBorder style={{ height: 320 }}>
      <Card.Section>
        <Image src={shop.photo.pc.l} height={160} alt='Norway' />
      </Card.Section>

      <Text weight={500}>
        <Anchor href={shop.urls.pc} target='_blank'>
          {shop.name}
        </Anchor>
      </Text>
      <Badge color='pink' variant='light'>
        {shop.genre.name}
      </Badge>
      <Text size='sm'>住所</Text>
      <Text size='xs' color='dimmed'>
        {shop.address}
      </Text>
      <Text size='sm'>平均ディナー予算</Text>
      <Text size='xs' color='dimmed'>
        {shop.budget.average ? shop.budget.average : '記載なし'}
      </Text>
    </Card>
  );
};
