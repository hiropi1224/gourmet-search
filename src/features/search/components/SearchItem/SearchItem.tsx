import React, { FC } from 'react';
import { Shop } from '@/types';
import { SearchItemTemplate } from '@/features/search/components/SearchItem/SearchItemTemplate';

type Props = {
  shop: Shop;
};

export const SearchItem: FC<Props> = ({ shop }) => {
  return <SearchItemTemplate shop={shop} />;
};
