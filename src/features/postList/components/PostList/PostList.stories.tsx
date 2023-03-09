import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostListTemplate } from './PostListTemplate';

export default {
  title: 'Post/PostListTemplate',
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
    post_url: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6',
    business_day: ['月', '火'],
    latlng: { lat: '', lng: '' },
  },
  {
    id: '2',
    created_at: '',
    user_id: '1',
    title: 'title 2',
    post_url: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6',
    business_day: ['水'],
    latlng: { lat: '', lng: '' },
  },
];

export const Primary = Template.bind({});
Primary.args = {
  posts: posts,
};
