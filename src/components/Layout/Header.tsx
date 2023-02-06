import { FC } from 'react';
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import router from 'next/router';
import { supabase } from '@/utils/supabase';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export const CustomHeader: FC = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  const onClick = (path: string) => {
    router.push(path);
  };

  return (
    <Box pb={120}>
      <Header height={60} px='md'>
        <Group position='apart' sx={{ height: '100%' }}>
          <Group
            sx={{ height: '100%' }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Button variant='subtle' radius='xs' onClick={() => onClick('/')}>
              検索
            </Button>

            <Button
              variant='subtle'
              radius='xs'
              onClick={() => onClick('/search')}
            >
              投稿一覧
            </Button>
            <Button
              variant='subtle'
              radius='xs'
              onClick={() => onClick('/search/post')}
            >
              投稿フォーム
            </Button>
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button onClick={() => supabase.auth.signOut()}>ログアウト</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='Navigation'
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx='-md'>
          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Button variant='subtle' radius='xs' onClick={() => onClick('/')}>
            検索
          </Button>

          <Button
            variant='subtle'
            radius='xs'
            onClick={() => onClick('/search')}
          >
            投稿一覧
          </Button>
          <Button
            variant='subtle'
            radius='xs'
            onClick={() => onClick('/search/post')}
          >
            投稿フォーム
          </Button>

          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Group position='center' grow pb='xl' px='md'>
            <Button onClick={() => supabase.auth.signOut()}>ログアウト</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
