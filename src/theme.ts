import {
  extendTheme,
  StyleFunctionProps,
  theme as baseTheme,
  type ThemeConfig,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: ({ colorMode }: StyleFunctionProps) => ({
      ':root': {
        '--panel-bg': colorMode === 'light' ? baseTheme.colors.white : baseTheme.colors.gray[800],
        '--message-link':
          colorMode === 'light' ? baseTheme.colors.teal[600] : baseTheme.colors.teal[200],
      },
    }),
  },
  colors: {
    'panel-bg': 'var(--panel-bg)',
    'message-link': 'var(--message-link)',
  },
});

export default theme;
