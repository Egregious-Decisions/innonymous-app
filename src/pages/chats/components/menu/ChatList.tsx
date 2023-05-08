import { Divider, Spinner, VStack, Button, Icon } from '@chakra-ui/react';
import ChatItem from './ChatItem';
import { apiSlice } from '../../../../store/apiSlice';
import { MdCreate } from 'react-icons/md';

const ChatList = () => {
  const { isLoading, data } = apiSlice.useListChatsQuery({});
  return (
    <>
      <Button leftIcon={<Icon as={MdCreate} />} variant="ghost">
        Create a chat
      </Button>
      <VStack
        divider={<Divider />}
        spacing="-0.5"
        minHeight="0"
        alignItems="stretch"
        overflowY="scroll"
        flex="1"
      >
        {isLoading ? (
          <Spinner size="xl" margin="auto" />
        ) : (
          data?.chats.map((chat) => <ChatItem chat={chat} key={chat.id} />)
        )}
      </VStack>
    </>
  );
};

export default ChatList;
