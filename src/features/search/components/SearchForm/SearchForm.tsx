import React, { FC } from 'react';
import { useSearchFormView } from '@/features/search/hooks/useSearchFormView';
import { UseStateFuncType, Results } from '@/types';
import { SearchFormTemplate } from '@/features/search/components/SearchForm/SearchFormTemplate';

type Props = {
  setGourmet: UseStateFuncType<Results | undefined>;
  setStatus: UseStateFuncType<boolean>;
};

export const SearchForm: FC<Props> = ({ setGourmet, setStatus }) => {
  const { form, onSubmit } = useSearchFormView(setGourmet, setStatus);

  return <SearchFormTemplate form={form} onSubmit={onSubmit} />;
};
