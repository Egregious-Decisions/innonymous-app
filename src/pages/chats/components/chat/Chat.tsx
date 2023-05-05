import { BoxProps, Flex, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdSend } from 'react-icons/md';
import Header from '../Header';
import MessagesView from './MessagesView';
import AutosizeTextarea from '../../../../components/AutosizeTextarea';

const Chat = (props: BoxProps) => {
  const navigate = useNavigate();
  return (
    <Flex flex="2" minHeight="0" direction="column" alignItems="stretch" {...props}>
      <Header>
        <IconButton
          aria-label="Back to menu"
          icon={<Icon as={BiArrowBack} />}
          onClick={() => navigate('..')}
        />
        <Text>Chat name</Text>
      </Header>
      <MessagesView />
      <HStack padding={2} alignItems="end">
        <IconButton aria-label="Add attachment" icon={<Icon as={MdAdd} />} />
        <AutosizeTextarea placeholder="Message text" maxHeight="32" paddingY={2} />
        <IconButton aria-label="Send message" icon={<Icon as={MdSend} />} />
      </HStack>
    </Flex>
  );
};

export default Chat;
