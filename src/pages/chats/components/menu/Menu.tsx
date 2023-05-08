import { Button, Flex, Icon, SkeletonText, Spacer, Text } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { useCallback, useMemo } from 'react';
import { MdLogout, MdSettings } from 'react-icons/md';
import Header from '../Header';
import ChatList from './ChatList';
import { useAppDispatch } from '../../../../store/store';
import { authSlice } from '../../../login/authSlice';
import { apiSlice } from '../../../../store/apiSlice';

const Menu = () => {
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
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Flex flex="1" minHeight="0" direction="column" alignItems="stretch">
      <Header>
        <Icon as={FaUserAlt} />
        {username}
        <Spacer />
        <Button leftIcon={<MdSettings />}>
          <Text>settings</Text>
        </Button>
        <Button leftIcon={<MdLogout />} onClick={onLogOut} colorScheme="red">
          log out
        </Button>
      </Header>
      <ChatList />
    </Flex>
  );
};

export default Menu;
