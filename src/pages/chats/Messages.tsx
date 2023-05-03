import { Flex } from '@chakra-ui/react';
import Menu from './components/menu/Menu';
import Chat from './components/chat/Chat';

const Chats = () => {
  return (
    <Flex maxHeight="100%" direction="row" alignItems="stretch" justifyContent="stretch">
      <Menu width="480px" />
      <Chat flex="1" />
    </Flex>
  );
};

export default Chats;
