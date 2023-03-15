import React, { FC } from 'react';
import { TextInput, Select, Checkbox, Group, Button } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { FormType } from '@/features/search/types';

type Props = {
  form: UseFormReturnType<FormType>;
  onSubmit: (values: FormType) => Promise<void>;
};

export const SearchFormTemplate: FC<Props> = ({ form, onSubmit }) => {
  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <TextInput
        my='md'
        size='md'
        label='検索キーワード'
        placeholder='キーワード'
        {...form.getInputProps('keyword')}
      />

      <Select
        my='md'
        size='md'
        label='検索結果の並び順'
        placeholder=''
        data={[
          { value: '4', label: 'おすすめ順' },
          { value: '1', label: '店名かな順' },
          { value: '3', label: 'エリア順' },
        ]}
        {...form.getInputProps('order')}
      />

      <Checkbox
        mt='md'
        label='ランチありで絞り込む'
        {...form.getInputProps('isLunch', { type: 'checkbox' })}
      />
      <Group position='center' my='md'>
        <Button type='submit' color='cyan'>
          検索
        </Button>
      </Group>
    </form>
  );
};
