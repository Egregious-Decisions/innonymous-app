import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import theme from './theme';
import { store } from './store/store';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <StrictMode>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
    </StrictMode>
  </>,
);
