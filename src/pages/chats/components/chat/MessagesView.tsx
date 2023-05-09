import { Box, Spinner, Stack, useColorModeValue } from '@chakra-ui/react';
import MessageItem from './MessageItem';
import { apiSlice } from '../../../../store/apiSlice';
import { Id } from '../../../../store/models';

const MessagesView = ({ chat }: { chat: Id }) => {
  const bgColor = useColorModeValue('blackAlpha.200', '');

  const { data, isLoading } = apiSlice.useListMessagesQuery({ chat });

  return (
    <Stack
      background={bgColor}
      maxHeight="100%"
      alignItems="start"
      paddingX={2}
      overflowY="scroll"
      direction="column-reverse"
      flex="1"
    >
      {isLoading && <Spinner size="xl" margin="auto" />}
      {data?.messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </Stack>
  );
};

export default MessagesView;
