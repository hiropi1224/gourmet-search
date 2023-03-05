import { CustomNextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import {
  Badge,
  Card,
  Box,
  SimpleGrid,
  Image,
  Text,
  Loader,
  Anchor,
} from '@mantine/core';
import { Results } from '@/types';
import { Layout } from '@/components/features/Common/Layout';
import { SearchForm } from '@/components/SearchForm';

const Home: CustomNextPage = () => {
  const [gourmet, setGourmet] = useState<Results>();
  const [status, setStatus] = useState<boolean>(false);

  return (
    <Layout>
      <>
        <Head>
          <title>lunch search</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Box sx={{ maxWidth: 300 }} mx='auto'>
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
              <Box key={ctx.id}>
                <Card
                  shadow='sm'
                  p='lg'
                  radius='md'
                  withBorder
                  style={{ height: 320 }}
                >
                  <Card.Section>
                    <Image src={ctx.photo.pc.l} height={160} alt='Norway' />
                  </Card.Section>

                  <Text weight={500}>
                    <Anchor href={ctx.urls.pc} target='_blank'>
                      {ctx.name}
                    </Anchor>
                  </Text>
                  <Badge color='pink' variant='light'>
                    {ctx.genre.name}
                  </Badge>
                  <Text size='sm'>住所</Text>
                  <Text size='xs' color='dimmed'>
                    {ctx.address}
                  </Text>
                  <Text size='sm'>平均ディナー予算</Text>
                  <Text size='xs' color='dimmed'>
                    {ctx.budget.average ? ctx.budget.average : '記載なし'}
                  </Text>
                </Card>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </>
    </Layout>
  );
};

export default Home;
