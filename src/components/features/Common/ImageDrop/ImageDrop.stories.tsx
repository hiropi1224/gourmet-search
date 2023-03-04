import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ImageDrop } from './ImageDrop';

export default {
  title: 'Common/ImageDrop',
  component: ImageDrop,
} as ComponentMeta<typeof ImageDrop>;

const Template: ComponentStory<typeof ImageDrop> = (args) => (
  <ImageDrop {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
