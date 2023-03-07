import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Post } from './Post';

export default {
  title: 'Post/Post',
  component: Post,
} as ComponentMeta<typeof Post>;

const Template: ComponentStory<typeof Post> = (args) => <Post {...args}></Post>;

export const Primary = Template.bind({});
Primary.args = {};
