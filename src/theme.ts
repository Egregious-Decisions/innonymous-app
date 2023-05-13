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
      },
    }),
  },
  colors: {
    'panel-bg': 'var(--panel-bg)',
  },
});

export default theme;
