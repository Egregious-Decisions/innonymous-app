import { Flex } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import Header from '../../components/layout/Header';
import MessagesView from './components/MessagesView';
import MessageInput from './components/MessageInput';
import HeaderName from '../../components/ui/HeaderName';
import { Chat as ChatObject } from '../../store/models';
import GoBackButton from '../../components/ui/GoBackButton';

const Chat = ({ chat }: { chat: ChatObject }) => {
  const viewRef = useRef<HTMLDivElement>(null);

  const onMessageSent = useCallback(
    () => viewRef.current?.scrollTo({ top: viewRef.current?.scrollHeight, behavior: 'smooth' }),
    [],
  );

  return (
    <Flex height="100%" direction="column" alignItems="stretch">
      <Header>
        <GoBackButton />
        <HeaderName name={chat.name} alias={chat.alias} />
      </Header>
      <MessagesView ref={viewRef} chat={chat.id} />
      <MessageInput chat={chat.id} onMessageSent={onMessageSent} />
    </Flex>
  );
};

export default Chat;
