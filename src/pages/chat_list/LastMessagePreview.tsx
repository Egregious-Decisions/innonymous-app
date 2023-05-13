import { HStack, Skeleton, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { apiSlice } from '../../store/apiSlice';
import MessageBody from '../chat/components/message/body/MessageBody';
import { Id } from '../../store/models';
import { messagesSelectors } from '../../store/messagesSlice';
import { useAppSelector } from '../../store/store';

const LastMessagePreview = ({ chat }: { chat: Id }) => {
  const { isLoading } = apiSlice.useListMessagesQuery({ chat, limit: 1 });
  const message = useAppSelector((state) =>
    messagesSelectors
      .selectAll(state)
      .filter(({ chat: chat_id }) => chat_id === chat)
      .shift(),
  );

  const [getUser, { data: user }] = apiSlice.useLazyGetUserQuery();

  useEffect(() => {
    if (!message) {
      return;
    }
    getUser({ user: message?.author });
  }, [message, getUser]);

  if (isLoading) {
    return <Skeleton />;
  }

  if (!message) {
    return (
      <Text color="gray" as="i">
        chat created
      </Text>
    );
  }

  return (
    <HStack color="gray">
      <Text>@{user?.alias}:</Text>
      <MessageBody noOfLines={1} body={message.body} isPreview />
    </HStack>
  );
};

export default LastMessagePreview;
