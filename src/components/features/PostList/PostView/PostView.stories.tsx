import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostView } from './PostView';

export default {
  title: 'Post/PostView',
  component: PostView,
} as ComponentMeta<typeof PostView>;

const Template: ComponentStory<typeof PostView> = (args) => (
  <PostView {...args}></PostView>
);

export const Primary = Template.bind({});
Primary.args = {};
