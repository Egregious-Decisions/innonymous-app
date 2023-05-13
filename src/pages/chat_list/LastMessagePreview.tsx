import { HStack, Skeleton, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { apiSlice } from '../../store/apiSlice';
import MessageBody from '../chat/components/message/body/MessageBody';
import { Id } from '../../store/models';

const LastMessagePreview = ({ chat }: { chat: Id }) => {
  const { data } = apiSlice.useListMessagesQuery({ chat, limit: 1 });
  const [getUser, { data: user }] = apiSlice.useLazyGetUserQuery();

  useEffect(() => {
    if (data?.messages.length !== 1) {
      return;
    }
    getUser({ user: data.messages[0].author });
  }, [data, getUser]);

  if (!data) {
    return <Skeleton />;
  }

  if (data.messages.length === 0) {
    return (
      <Text color="gray" as="i">
        chat created
      </Text>
    );
  }

  return (
    <HStack color="gray">
      <Text>@{user?.alias}:</Text>
      <MessageBody noOfLines={1} body={data.messages[0].body} isPreview />
    </HStack>
  );
};

export default LastMessagePreview;
