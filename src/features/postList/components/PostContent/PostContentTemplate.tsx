import React, { FC } from 'react';
import { Card, Group, Image, Text } from '@mantine/core';

type Props = {
  title: string;
  image: string;
  BusinessDay: JSX.Element | JSX.Element[];
  children: JSX.Element;
  onClickCard: VoidFunction;
};

export const PostContentTemplate: FC<Props> = ({
  title,
  image,
  BusinessDay,
  children,
  onClickCard,
}) => {
  return (
    <Card
      withBorder
      radius='md'
      onClick={onClickCard}
      sx={(theme) => ({
        '&:hover': {
          boxShadow: theme.shadows.md,
          transform: 'scale(1.02)',
        },
      })}
    >
      <Card.Section>
        <Image src={image} alt={title} height={240} />
      </Card.Section>

      <Card.Section mt='md' pl='md'>
        <Group position='apart'>
          <Text fz='lg' fw={500}>
            {title}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section p='md'>
        <Text c='dimmed'>営業日</Text>
        <Group spacing={7} mt={5}>
          {BusinessDay}
        </Group>
      </Card.Section>
      <Card.Section>{children}</Card.Section>
    </Card>
  );
};
