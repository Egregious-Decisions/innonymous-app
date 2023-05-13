import { Spinner, Stack, useColorModeValue } from '@chakra-ui/react';
import { forwardRef, useMemo } from 'react';
import MessageItem from './message/MessageItem';
import { Id } from '../../../store/models';
import { apiSlice } from '../../../store/apiSlice';
import { useAppSelector } from '../../../store/store';
import { messagesSelectors } from '../../../store/messagesSlice';
import LoadMoreTrigger from './LoadMoreTrigger';
import NoMessages from './NoMessages';

const MessagesView = forwardRef<HTMLDivElement, { chat: Id }>(({ chat }, ref) => {
  const bgColor = useColorModeValue('blackAlpha.200', '');
  const messages = useAppSelector((state) =>
    messagesSelectors.selectAll(state).filter(({ chat: chat_id }) => chat_id === chat),
  );
  const { isLoading } = apiSlice.useListMessagesQuery({ chat, limit: 20 });

  const oldestLoadedDate = useMemo(
    () => (messages.length > 0 ? messages[messages.length - 1].created_at : null),
    [messages],
  );

  return (
    <Stack
      ref={ref}
      background={bgColor}
      maxHeight="100%"
      alignItems="start"
      padding={2}
      overflowY="scroll"
      direction="column-reverse"
      flex="1"
    >
      {isLoading && <Spinner size="xl" margin="auto" />}
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {!isLoading && messages.length === 0 && <NoMessages caption="no messages here yet" />}
      {oldestLoadedDate && <LoadMoreTrigger chat={chat} limit={20} before={oldestLoadedDate} />}
    </Stack>
  );
});

export default MessagesView;
