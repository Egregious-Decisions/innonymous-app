import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import Chats from './pages/chats/Chats';
import Chat from './pages/chats/components/chat/Chat';
import NoChatSelected from './pages/chats/components/chat/NoChatSelected';
import Login from './pages/login/Login';

export const authRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/" element={<Chats />}>
        <Route path=":id" element={<Chat />} />
        <Route index element={<NoChatSelected />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </>,
  ),
);

export const noAuthRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </>,
  ),
);
