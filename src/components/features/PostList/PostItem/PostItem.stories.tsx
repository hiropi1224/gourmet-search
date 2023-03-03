/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Text } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostItem } from './PostItem';

export default {
  title: 'Post/PostItem',
  component: PostItem,
} as ComponentMeta<typeof PostItem>;

const Template: ComponentStory<typeof PostItem> = (args) => (
  <PostItem {...args}></PostItem>
);

const EditAction = (
  <div className='flex pr-4'>
    <PencilAltIcon
      data-testid='pencil-post'
      className='mx-1 h-5 w-5 cursor-pointer text-blue-500'
      onClick={() => {}}
    />
    <TrashIcon
      data-testid='trash-post'
      className='h-5 w-5 cursor-pointer text-blue-500'
      onClick={() => {}}
    />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'title',
  imgUrl: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2',
  onClickCard: () => {},
  BusinessDay: (
    <>
      <Text size='sm'>月曜</Text>
      <Text size='sm'>火曜</Text>
      <Text size='sm'>水曜</Text>
    </>
  ),
};

export const WithEditAction = Template.bind({});
WithEditAction.args = {
  title: 'title',
  imgUrl: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2',
  onClickCard: () => {},
  BusinessDay: (
    <>
      <Text size='sm'>月曜</Text>
      <Text size='sm'>火曜</Text>
      <Text size='sm'>水曜</Text>
    </>
  ),
  EditAction: EditAction,
};
