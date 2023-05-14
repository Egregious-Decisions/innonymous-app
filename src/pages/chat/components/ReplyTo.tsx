import { Box, Text, SkeletonText, HStack, Icon } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { messagesSelectors, getMessageId } from '../../../store/messagesSlice';
import { useAppSelector } from '../../../store/store';
import MessageBody from './message/body/MessageBody';
import { Id } from '../../../store/models';
import { apiSlice } from '../../../store/apiSlice';

const ReplyTo = ({ chat, reply_to }: { chat: Id; reply_to: Id }) => {
  const message = useAppSelector((state) =>
    messagesSelectors.selectById(state, getMessageId(chat, reply_to)),
  );
  const [getUser, { data: user }] = apiSlice.useLazyGetUserQuery();

  useEffect(() => {
    if (!message) {
      return;
    }
    getUser({ user: message.author });
  }, [getUser, message]);

  return (
    <HStack width="0" flex="1">
      <Icon as={FaAngleRight} />
      <Box width="0" flex="1">
        {user ? (
          <Text fontWeight="bold">{user?.name || `@${user.alias}`}</Text>
        ) : (
          <SkeletonText minWidth="10em" noOfLines={1} />
        )}
        {message ? (
          <MessageBody body={message.body} isPreview noOfLines={1} />
        ) : (
          <SkeletonText minWidth="10em" noOfLines={1} />
        )}
      </Box>
    </HStack>
  );
};

export default ReplyTo;
