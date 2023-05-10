import { Center, Flex, Icon, IconButton, Spinner, Text } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useMemo, useRef } from 'react';
import Header from '../Header';
import MessagesView from './MessagesView';
import { apiSlice } from '../../../../store/apiSlice';
import MessageInput from './MessageInput';

const Chat = () => {
  const navigate = useNavigate();
  const viewRef = useRef<HTMLDivElement>(null);

  const { chat: alias } = useParams();
  const { data: chats, isLoading } = apiSlice.useListChatsQuery({});

  const chat = useMemo(() => chats?.chats.findLast((item) => item.alias === alias), [alias, chats]);

  const onMessageSent = useCallback(
    () => viewRef.current?.scrollTo({ top: viewRef.current?.scrollHeight, behavior: 'smooth' }),
    [],
  );

  if (isLoading) {
    return (
      <Center height="100%">
        <Spinner size="xl" margin="auto" />
      </Center>
    );
  }

  if (chat === undefined) {
    return <Navigate to="/" />;
  }

  return (
    <Flex height="100%" direction="column" alignItems="stretch">
      <Header>
        <IconButton
          aria-label="Back to menu"
          icon={<Icon as={BiArrowBack} />}
          onClick={() => navigate('..')}
        />
        <Text>{chat.name}</Text>
      </Header>
      <MessagesView ref={viewRef} chat={chat.id} />
      <MessageInput chat={chat.id} onMessageSent={onMessageSent} />
    </Flex>
  );
};

export default Chat;
