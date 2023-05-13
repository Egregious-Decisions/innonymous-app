import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppRouteParams } from '../hooks';
import { apiSlice } from '../store/apiSlice';
import Chat from './chat/Chat';
import User from './user/User';

const ResolveAlias = () => {
  const { alias } = useAppRouteParams();
  const toast = useToast();
  const navigate = useNavigate();
  const {
    data: chat,
    isSuccess: isChatFound,
    isError: isChatError,
  } = apiSlice.useGetChatQuery({ chat: alias as string });
  const {
    data: user,
    isSuccess: isUserFound,
    isError: isUserError,
  } = apiSlice.useGetUserQuery({ user: alias as string });

  useEffect(() => {
    if (!isUserError || !isChatError) {
      return;
    }

    toast({ description: 'user or chat not found', status: 'error' });
    navigate('/');
  }, [isChatError, isUserError, navigate, toast]);

  if (isUserFound) {
    return <User user={user} />;
  }

  if (isChatFound) {
    return <Chat chat={chat} />;
  }

  return (
    <Center height="100%">
      <Spinner size="xl" margin="auto" />
    </Center>
  );
};

export default ResolveAlias;
