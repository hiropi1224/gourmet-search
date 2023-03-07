import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostListTemplate } from './PostList';

export default {
  title: 'Post/PostList',
  component: PostListTemplate,
} as ComponentMeta<typeof PostListTemplate>;

const Template: ComponentStory<typeof PostListTemplate> = (args) => (
  <PostListTemplate {...args}></PostListTemplate>
);

const posts = [
  {
    id: '1',
    created_at: '',
    user_id: '1',
    title: 'title 1',
    post_url: 'string',
    business_day: ['月', '火'],
    latlng: { lat: '', lng: '' },
  },
  {
    id: '2',
    created_at: '',
    user_id: '1',
    title: 'title 2',
    post_url: 'string',
    business_day: ['水'],
    latlng: { lat: '', lng: '' },
  },
];

export const Primary = Template.bind({});
Primary.args = {
  posts: posts,
};
