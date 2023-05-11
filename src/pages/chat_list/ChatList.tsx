import { Divider, Spinner, VStack, Button, Icon } from '@chakra-ui/react';
import { MdCreate } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import ChatItem from './ChatItem';
import { apiSlice } from '../../store/apiSlice';
import { useAppSelector } from '../../store/store';
import { chatsSelectors } from '../../store/chatsSlice';

const ChatList = () => {
  const [_, setParams] = useSearchParams();

  const chats = useAppSelector((state) => chatsSelectors.selectAll(state));

  const { isLoading } = apiSlice.useListChatsQuery({ limit: 20 });

  return (
    <>
      <Button leftIcon={<Icon as={MdCreate} />} variant="ghost" onClick={() => setParams('new')}>
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
          // data?.chats.map((chat) => <ChatItem chat={chat} key={chat.id} />)
          chats.map((chat) => <ChatItem chat={chat} key={chat.id} />)
        )}
      </VStack>
    </>
  );
};

export default ChatList;
