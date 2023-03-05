import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostList } from './PostList';

export default {
  title: 'Post/PostList',
  component: PostList,
} as ComponentMeta<typeof PostList>;

const Template: ComponentStory<typeof PostList> = (args) => (
  <PostList {...args}></PostList>
);

const posts = [
  {
    id: '1',
    created_at: '',
    user_id: '1',
    title: 'title',
    post_url: 'string',
    business_day: ['月', '火'],
    latlng: { lat: '', lng: '' },
  },
  {
    id: '1',
    created_at: '',
    user_id: '1',
    title: 'title',
    post_url: 'string',
    business_day: ['月', '火'],
    latlng: { lat: '', lng: '' },
  },
];

export const Primary = Template.bind({});
Primary.args = {
  posts: posts,
};
