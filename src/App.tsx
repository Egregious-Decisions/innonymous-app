import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { setToken } from './pages/login/authSlice';
import Login from './pages/login/Login';
import Chats from './pages/chats/Chats';
import useReduxLocalStorage from './store/hooks';
import { RootState } from './store/store';
import './index.css';
import NoChatSelected from './pages/chats/components/chat/NoChatSelected';
import Chat from './pages/chats/components/chat/Chat';

const App = () => {
  const token = useReduxLocalStorage((state: RootState) => state.auth.token, setToken, 'token', '');

  const isAuthenticated = token !== '';

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/" element={<Chats />}>
              <Route path=":id" element={<Chat />} />
              <Route index element={<NoChatSelected />} />
            </Route>
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
