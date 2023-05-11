import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { useMemo, useEffect } from 'react';
import { MdArrowBack, MdCreate, MdSettings } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import Header from './Header';
import ChatList from '../../pages/chat_list/ChatList';
import Settings from '../../pages/settings/Settings';
import HeaderName from '../ui/HeaderName';
import CreateChat from '../../pages/create_chat/CreateChat';
import { apiSlice } from '../../store/apiSlice';
import { UserPrivateInfo } from '../../store/models';
import CollapsingIconButton from '../ui/CollapsingIconButton';

const Menu = () => {
  const [params, setParams] = useSearchParams();
  const { data, isLoading } = apiSlice.useGetCurrentUserQuery();

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

  const buttons = useMemo(() => {
    switch (params.keys().next().value) {
      case 'new':
      case 'settings':
        return (
          <CollapsingIconButton
            aria-label="back to chats"
            leftIcon={<MdArrowBack />}
            onClick={() => setParams('')}
          >
            <Text>back to chats</Text>
          </CollapsingIconButton>
        );
      default:
        return (
          <>
            <CollapsingIconButton
              aria-label="new chat"
              colorScheme="teal"
              leftIcon={<MdCreate />}
              onClick={() => setParams('new')}
            >
              <Text>new chat</Text>
            </CollapsingIconButton>
            <CollapsingIconButton
              aria-label="settings"
              leftIcon={<MdSettings />}
              onClick={() => setParams('settings')}
            >
              <Text>settings</Text>
            </CollapsingIconButton>
          </>
        );
    }
  }, [params, setParams]);

  return (
    <Flex flex="1" minHeight="0" direction="column" alignItems="stretch">
      <Header>
        <Icon as={FaUserAlt} />
        <HeaderName {...{ isLoading, name, alias }} />
        {buttons}
      </Header>
      {content}
    </Flex>
  );
};

export default Menu;
