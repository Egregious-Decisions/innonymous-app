import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import theme from './theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <StrictMode>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </StrictMode>
  </>,
);
