import { RouterProvider } from 'react-router-dom';
import { initialState as authInitialState } from './store/authSlice';
import useReduxLocalStorage from './store/hooks';
import { RootState } from './store/store';
import { authRoutes, noAuthRoutes } from './router';
import './index.css';
import { authRestored } from './store/actions';

const App = () => {
  const auth = useReduxLocalStorage(
    (state: RootState) => state.auth,
    authRestored,
    'auth',
    authInitialState,
  );

  const noAuth = auth.access_token === '';

  return <RouterProvider router={noAuth ? noAuthRoutes : authRoutes} />;
};

export default App;
