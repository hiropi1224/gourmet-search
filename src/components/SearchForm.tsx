import React, { FC } from 'react';
import { Box, TextInput, Checkbox, Group, Button, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Results, Root, UseStateFuncType } from '@/types';

type Props = {
  setGourmet: UseStateFuncType<Results | undefined>;
  setStatus: UseStateFuncType<boolean>;
};

export const SearchForm: FC<Props> = (props): JSX.Element => {
  const { setGourmet, setStatus } = props;

  const form = useForm({
    initialValues: {
      keyword: '',
      isLunch: false,
      order: '4',
    },

    validate: {
      keyword: (value) => (value.length < 1 ? '入力してください' : null),
    },
  });

  const onSubmit = async (values: {
    keyword: string;
    isLunch: boolean;
    order: string;
  }) => {
    const params = {
      keyword: values.keyword,
      lunch: values.isLunch ? '1' : '0',
      order: values.order,
    };

    const query = new URLSearchParams(params);
    setStatus(true);
    const request = async () => {
      const res = await fetch(`/api/search?${query}`);
      const data: Root = await res.json();

      setGourmet(data.results);
    };

    await request();
    setStatus(false);
    values.keyword = '';
    values.isLunch = false;
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
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
    </Box>
  );
};
