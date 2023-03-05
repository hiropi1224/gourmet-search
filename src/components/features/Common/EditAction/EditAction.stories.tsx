import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditAction } from './EditAction';

export default {
  title: 'Common/EditAction',
  component: EditAction,
} as ComponentMeta<typeof EditAction>;

const Template: ComponentStory<typeof EditAction> = (args) => (
  <EditAction {...args}>EditAction</EditAction>
);

export const Primary = Template.bind({});
Primary.args = {};