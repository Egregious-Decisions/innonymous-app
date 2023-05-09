import { Center, Flex, HStack, Icon, IconButton, Spinner, Text } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { MdAdd, MdSend } from 'react-icons/md';
import { useMemo } from 'react';
import Header from '../Header';
import MessagesView from './MessagesView';
import AutosizeTextarea from '../../../../components/AutosizeTextarea';
import { apiSlice } from '../../../../store/apiSlice';

const Chat = () => {
  const navigate = useNavigate();

  const { chat: alias } = useParams();
  const { data: chats, isLoading } = apiSlice.useListChatsQuery({});

  const chat = useMemo(() => chats?.chats.findLast((item) => item.alias === alias), [alias, chats]);

  if (isLoading) {
    return (
      <Center height="100%">
        <Spinner size="xl" margin="auto" />
      </Center>
    );
  }

  if (chat === undefined) {
    return <Navigate to="/" />;
  }

  return (
    <Flex height="100%" direction="column" alignItems="stretch">
      <Header>
        <IconButton
          aria-label="Back to menu"
          icon={<Icon as={BiArrowBack} />}
          onClick={() => navigate('..')}
        />
        <Text>{chat.name}</Text>
      </Header>
      <MessagesView chat={chat.id} />
      <HStack background="panel-bg" padding={2} alignItems="end">
        <IconButton aria-label="Add attachment" icon={<Icon as={MdAdd} />} />
        <AutosizeTextarea placeholder="Message text" maxHeight="32" paddingY={2} />
        <IconButton colorScheme="teal" aria-label="Send message" icon={<Icon as={MdSend} />} />
      </HStack>
    </Flex>
  );
};

export default Chat;
