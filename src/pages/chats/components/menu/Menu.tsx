import {
  BoxProps,
  Button,
  Flex,
  Icon,
  IconButton,
  SkeletonText,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import Header from '../Header';
import ChatList from './ChatList';
import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../../../store/store';
import { authSlice } from '../../../login/authSlice';
import { apiSlice } from '../../../../store/apiSlice';

const Menu = (props: BoxProps) => {
  const dispatch = useAppDispatch();
  const { isFetching, data } = apiSlice.useGetCurrentUserQuery();

  const onLogOut = useCallback(() => dispatch(authSlice.actions.clearTokens()), [dispatch]);

  const username = useMemo(() => {
    if (isFetching || data === undefined) {
      return <SkeletonText>Username</SkeletonText>;
    }

    return <Text>{data.name || data.alias}</Text>;
  }, [data, isFetching]);

  return (
    <Flex flex="1" minHeight="0" direction="column" alignItems="stretch" {...props}>
      <Header>
        <Icon as={FaUserAlt} />
        {username}
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
