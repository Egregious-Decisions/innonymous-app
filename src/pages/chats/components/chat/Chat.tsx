import { Box, BoxProps, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import Header from '../Header';
import MessagesView from './MessagesView';

const Chat = (props: BoxProps) => {
  return (
    <Flex maxHeight="100%" direction="column" alignItems="stretch" {...props}>
      <Header>
        <IconButton aria-label="Back to menu" icon={<Icon as={BiArrowBack} />} />
        <Text>Chat name</Text>
      </Header>
      <MessagesView />
      <Box height="20" />
    </Flex>
  );
};

export default Chat;
