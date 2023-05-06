import {
  Box,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Chat } from '../../../../store/models';
import { Link } from 'react-router-dom';
import DateTime from '../../../../components/DateTime';

const ChatItem = ({ chat }: { chat: Chat }) => {
  const hoverColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <LinkBox _hover={{ background: hoverColor }}>
      <LinkOverlay as={Link} to={chat.id}>
        <Box padding="3">
          <HStack>
            <Text noOfLines={1}>{chat.name}</Text>
            <Text minWidth="fit-content" color="gray">
              {chat.alias}
            </Text>
            <Spacer />
            <Text minWidth="fit-content">
              <DateTime time={chat.updated_at} format="chat_time" />
            </Text>
          </HStack>
          <Text noOfLines={1}>{chat.about}</Text>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

export default ChatItem;
