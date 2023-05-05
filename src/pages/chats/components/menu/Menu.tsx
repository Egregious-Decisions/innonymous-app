import { BoxProps, Button, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import Header from '../Header';
import ChatList from './ChatList';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../../store/store';
import { authSlice } from '../../../login/authSlice';

const Menu = (props: BoxProps) => {
  const dispatch = useAppDispatch();

  const onLogOut = useCallback(() => dispatch(authSlice.actions.clearToken()), [dispatch]);

  return (
    <Flex flex="1" minHeight="0" direction="column" alignItems="stretch" {...props}>
      <Header>
        <Icon as={FaUserAlt} />
        <Text>Username</Text>
        <Spacer />
        <Button onClick={onLogOut} colorScheme="red">
          log out
        </Button>
      </Header>
      <ChatList />
    </Flex>
  );
};

export default Menu;
