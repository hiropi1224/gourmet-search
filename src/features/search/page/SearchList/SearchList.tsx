import React, { FC, useState } from 'react';
import { Box, Loader, SimpleGrid } from '@mantine/core';
import { Results } from '@/types';
import { SearchForm } from '@/features/search/components/SearchForm';
import { SearchItem } from '@/features/search/components/SearchItem';

export const SearchList: FC = () => {
  const [gourmet, setGourmet] = useState<Results>();
  const [status, setStatus] = useState<boolean>(false);

  return (
    <>
      <Box mx='auto'>
        <SearchForm setGourmet={setGourmet} setStatus={setStatus} />
      </Box>

      {status && <Loader />}
      {gourmet && !status && (
        <SimpleGrid
          breakpoints={[
            { minWidth: 'sm', cols: 2 },
            { minWidth: 'md', cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}
        >
          {gourmet.shop.map((ctx) => (
            <SearchItem key={ctx.id} shop={ctx} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
