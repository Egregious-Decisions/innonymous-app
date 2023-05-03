import { BoxProps, Button, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import Header from '../Header';
import ChatList from './ChatList';

const Menu = (props: BoxProps) => {
  return (
    <Flex maxHeight="100%" direction="column" alignItems="stretch" {...props}>
      <Header>
        <Icon as={FaUserAlt} />
        <Text>Username</Text>
        <Spacer />
        <Button colorScheme="red">log out</Button>
      </Header>
      <ChatList />
    </Flex>
  );
};

export default Menu;
