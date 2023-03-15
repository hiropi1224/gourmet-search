import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';

import { useSearchFormView } from '@/features/search/hooks/useSearchFormView';
import { Results } from '@/types';
import { SearchFormTemplate } from './SearchFormTemplate';

export default {
  title: 'Search/SearchFormTemplate',
  component: SearchFormTemplate,
} as ComponentMeta<typeof SearchFormTemplate>;

export const Primary = (): JSX.Element => {
  const [_gourmet, setGourmet] = useState<Results>();
  const [_status, setStatus] = useState<boolean>(false);
  const { form, onSubmit } = useSearchFormView(setGourmet, setStatus);

  return <SearchFormTemplate form={form} onSubmit={onSubmit} />;
};
