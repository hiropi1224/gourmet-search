// .storybook/preview.tsx

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useDarkMode } from 'storybook-dark-mode';
import React from 'react';
// import theme object you've exported in previous step
import { theme } from './theme';
import '../src/styles/globals.css';

// Create a wrapper component that will contain all your providers.
// Usually you should render all providers in this component:
// MantineProvider, NotificationsProvider, ModalsProvider, SpotlightProvider, etc.
function ThemeWrapper(props: { children: React.ReactNode }) {
  const colorScheme = useDarkMode() ? 'dark' : 'light';

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={() => {}}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        {props.children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

// enhance your stories with decorator that uses ThemeWrapper
export const decorators = [
  (renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
];
