import router from 'next/router';
import { FC, useEffect } from 'react';
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
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoonStars } from '@tabler/icons';
import useStore from '@/store';
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
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
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
    padding: `${theme.spacing.md} calc(${theme.spacing.lg} * 2)`,
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
  const session = useStore((state) => state.session);
  const isDark = useStore((state) => state.isDark);
  const changeIsDark = useStore((state) => state.changeIsDark);
  const setSession = useStore((state) => state.setSession);
  useEffect(() => {
    supabase.auth.getSession().then((res) => setSession(res.data.session));
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);
  const onClick = (path: string) => {
    router.push(path);
  };

  return (
    <Box pb={20}>
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
              onClick={() => onClick('/post')}
            >
              投稿一覧
            </Button>
            <Button
              variant='subtle'
              radius='xs'
              onClick={() => onClick('/post/postForm')}
            >
              投稿フォーム
            </Button>
          </Group>

          <Group position='center'>
            <ActionIcon
              onClick={() => changeIsDark(!isDark)}
              size='lg'
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.yellow[4]
                    : theme.colors.blue[6],
              })}
            >
              {isDark ? (
                <IconSun size='1.2rem' />
              ) : (
                <IconMoonStars size='1.2rem' />
              )}
            </ActionIcon>
            {session && (
              <Group className={classes.hiddenMobile}>
                <Button
                  onClick={() => {
                    void supabase.auth.signOut();
                  }}
                >
                  ログアウト
                </Button>
              </Group>
            )}
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

          <Button variant='subtle' radius='xs' onClick={() => onClick('/post')}>
            投稿一覧
          </Button>
          <Button
            variant='subtle'
            radius='xs'
            onClick={() => onClick('/post/postForm')}
          >
            投稿フォーム
          </Button>

          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          {session && (
            <Group position='center' grow pb='xl' px='md'>
              <Button onClick={() => void supabase.auth.signOut()}>
                ログアウト
              </Button>
            </Group>
          )}
          <Group position='center' my='xl'>
            <ActionIcon
              onClick={() => changeIsDark(!isDark)}
              size='lg'
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.yellow[4]
                    : theme.colors.blue[6],
              })}
            >
              {isDark ? (
                <IconSun size='1.2rem' />
              ) : (
                <IconMoonStars size='1.2rem' />
              )}
            </ActionIcon>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
