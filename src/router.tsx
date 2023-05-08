import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouteObject,
} from 'react-router-dom';
import Chats from './pages/chats/Chats';
import Chat from './pages/chats/components/chat/Chat';
import NoChatSelected from './pages/chats/components/chat/NoChatSelected';
import Login from './pages/login/Login';
import LoginForm from './pages/login/components/LoginForm';
import NewAccountForm from './pages/login/components/NewAccountForm';
import logIn from './actions/logIn';
import createAccount from './actions/createAccount';

const defaultRoute: RouteObject = {
  path: '*',
  element: <Navigate to="/" />,
};

export const authRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Chats />,
    children: [
      {
        index: true,
        element: <NoChatSelected />,
      },
      {
        path: ':id',
        element: <Chat />,
      },
    ],
  },
  defaultRoute,
]);

export const noAuthRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    action: logIn,
    children: [
      {
        index: true,
        element: <LoginForm newAccountUrl="/join" actionUrl=".." />,
      },
      {
        path: 'join',
        element: <NewAccountForm loginUrl="/" loginActionUrl=".." />,
        action: createAccount,
      },
    ],
  },
  defaultRoute,
]);
