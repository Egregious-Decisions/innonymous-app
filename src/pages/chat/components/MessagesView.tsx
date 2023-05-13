import { Spinner, Stack, useBoolean, useColorModeValue } from '@chakra-ui/react';
import { forwardRef, useCallback, useMemo } from 'react';
import MessageItem from './message/MessageItem';
import { Id } from '../../../store/models';
import { apiSlice } from '../../../store/apiSlice';
import { useAppSelector } from '../../../store/store';
import { messagesSelectors } from '../../../store/messagesSlice';
import NoMessages from './NoMessages';
import LoadMoreTrigger from '../../../components/ui/LoadMoreTrigger';
import { pendingSelectors } from '../../../store/pendingSlice';

const MessagesView = forwardRef<HTMLDivElement, { chat: Id }>(({ chat }, ref) => {
  const bgColor = useColorModeValue('blackAlpha.200', '');
  const messages = useAppSelector((state) =>
    messagesSelectors.selectAll(state).filter(({ chat: chat_id }) => chat_id === chat),
  );
  const pendingMessages = useAppSelector((state) =>
    pendingSelectors.selectAll(state).filter(({ chat: chat_id }) => chat_id === chat),
  );
  const [isEndReached, { on: onEndReached }] = useBoolean(false);
  const { isLoading } = apiSlice.useListMessagesQuery({ chat, limit: 20 });
  const [loadMore, { isError }] = apiSlice.useLazyListMessagesQuery();

  const oldestLoadedDate = useMemo(
    () => (messages.length > 0 ? messages[messages.length - 1].created_at : null),
    [messages],
  );

  const onLoadMore = useCallback(() => {
    if (!oldestLoadedDate) {
      return;
    }

    loadMore({ chat, limit: 20, created_before: oldestLoadedDate })
      .unwrap()
      .then(({ messages: olderMessages }) => {
        if (olderMessages.length === 1 && olderMessages[0].created_at === oldestLoadedDate) {
          onEndReached();
        }
      });
  }, [chat, loadMore, oldestLoadedDate, onEndReached]);

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
      {pendingMessages.map((message) => (
        <MessageItem key={message.requestId} message={message} />
      ))}
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {!isLoading && messages.length === 0 && <NoMessages caption="no messages here yet" />}
      {oldestLoadedDate && (
        <LoadMoreTrigger
          load={onLoadMore}
          error="failed loading older messages"
          {...{ isError, isEndReached }}
        />
      )}
    </Stack>
  );
});

export default MessagesView;
