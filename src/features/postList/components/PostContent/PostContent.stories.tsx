import React from 'react';
import { Badge } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostContentTemplate } from './PostContentTemplate';

export default {
  title: 'PostList/PostContentTemplate',
  component: PostContentTemplate,
} as ComponentMeta<typeof PostContentTemplate>;

const Template: ComponentStory<typeof PostContentTemplate> = (args) => (
  <PostContentTemplate {...args} />
);

const days = ['月曜', '火曜', '水曜'];

const BusinessDay = days.map((day) => (
  <Badge color={'gray'} key={day}>
    {day}
  </Badge>
));

export const Primary = Template.bind({});
Primary.args = {
  title: 'Sample Sample',
  image: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6',
  BusinessDay: BusinessDay,
};
