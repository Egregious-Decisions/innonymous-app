import { Box, Center, Divider, Spinner, Text, VStack, useBoolean } from '@chakra-ui/react';
import { useMemo, useCallback } from 'react';
import ChatItem from './ChatItem';
import { apiSlice } from '../../store/apiSlice';
import { useAppSelector } from '../../store/store';
import { chatsSelectors } from '../../store/chatsSlice';
import LoadMoreTrigger from '../../components/ui/LoadMoreTrigger';

const ChatList = () => {
  const chats = useAppSelector((state) => chatsSelectors.selectAll(state));

  const { isLoading } = apiSlice.useListChatsQuery({ limit: 20 });

  const [isEndReached, { on: onEndReached }] = useBoolean(false);
  const [loadMore, { isError }] = apiSlice.useLazyListChatsQuery();

  const oldestLoadedDate = useMemo(
    () => (chats.length > 0 ? chats[chats.length - 1].updated_at : null),
    [chats],
  );

  const onLoadMore = useCallback(() => {
    if (!oldestLoadedDate) {
      return;
    }

    loadMore({ limit: 20, updated_before: oldestLoadedDate })
      .unwrap()
      .then(({ chats: olderChats }) => {
        if (olderChats.length === 1 && olderChats[0].updated_at === oldestLoadedDate) {
          onEndReached();
        }
      });
  }, [loadMore, oldestLoadedDate, onEndReached]);

  return (
    <VStack
      divider={<Divider />}
      spacing="-0.5"
      minHeight="0"
      alignItems="stretch"
      overflowY="scroll"
      flex="1"
    >
      {isLoading && <Spinner size="xl" margin="auto" />}
      {chats.map((chat) => (
        <ChatItem chat={chat} key={chat.id} />
      ))}
      {!isLoading && chats.length === 0 && (
        <Center flex="1">
          <Text>no chats yet</Text>
        </Center>
      )}
      {oldestLoadedDate !== null && (
        <Box paddingY="3">
          <LoadMoreTrigger
            load={onLoadMore}
            error="failed loading older chats"
            {...{ isError, isEndReached }}
          />
        </Box>
      )}
    </VStack>
  );
};

export default ChatList;
