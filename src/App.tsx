import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { setToken } from './pages/login/authSlice';
import Login from './pages/login/Login';
import Messages from './pages/chats/Messages';
import useReduxLocalStorage from './store/hooks';
import { RootState } from './store/store';
import './index.css';

const App = () => {
  const token = useReduxLocalStorage((state: RootState) => state.auth.token, setToken, 'token', '');

  const isAuthenticated = token !== '';

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Messages />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
