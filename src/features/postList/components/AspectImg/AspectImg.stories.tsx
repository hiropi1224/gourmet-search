import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AspectImg } from './AspectImg';

export default {
  title: 'Img/AspectImg',
  component: AspectImg,
} as ComponentMeta<typeof AspectImg>;

const Template: ComponentStory<typeof AspectImg> = (args) => (
  <AspectImg {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  imgUrl: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2',
};
