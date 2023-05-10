import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { useCallback, useMemo, useEffect } from 'react';
import { MdArrowBack, MdLogout, MdSettings } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import Header from './Header';
import { useAppDispatch } from '../../store/store';
import { authSlice } from '../../pages/login/authSlice';
import ChatList from '../../pages/chat_list/ChatList';
import Settings from '../../pages/settings/Settings';
import HeaderName from '../ui/HeaderName';
import CreateChat from '../../pages/create_chat/CreateChat';
import { apiSlice } from '../../store/apiSlice';
import { UserPrivateInfo } from '../../store/models';

const Menu = () => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const { data, isLoading } = apiSlice.useGetCurrentUserQuery();

  const onLogOut = useCallback(() => dispatch(authSlice.actions.clearTokens()), [dispatch]);

  useEffect(() => {
    if (params.size > 1) {
      setParams('');
    }
  }, [params, setParams]);

  const content = useMemo(() => {
    switch (params.keys().next().value) {
      case 'new':
        return <CreateChat />;
      case 'settings':
        return <Settings />;
      default:
        return <ChatList />;
    }
  }, [params]);

  const { name, alias } = useMemo<Pick<UserPrivateInfo, 'name' | 'alias'>>(
    () => data || { name: '', alias: '' },
    [data],
  );

  const settingsButton = useMemo(
    () =>
      params.has('settings') ? (
        <Button leftIcon={<MdArrowBack />} onClick={() => setParams('')}>
          <Text>back to chats</Text>
        </Button>
      ) : (
        <Button leftIcon={<MdSettings />} onClick={() => setParams('settings')}>
          <Text>settings</Text>
        </Button>
      ),
    [params, setParams],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Flex flex="1" minHeight="0" direction="column" alignItems="stretch">
      <Header>
        <Icon as={FaUserAlt} />
        <HeaderName {...{ isLoading, name, alias }} />
        {settingsButton}
        <Button leftIcon={<MdLogout />} onClick={onLogOut} colorScheme="red">
          log out
        </Button>
      </Header>
      {content}
    </Flex>
  );
};

export default Menu;
