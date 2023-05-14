import { HStack, CloseButton, Box, Text, SkeletonText } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { messageInputCancel } from '../../../store/actions';
import { messagesSelectors, getMessageId } from '../../../store/messagesSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import MessageBody from './message/body/MessageBody';
import { Id } from '../../../store/models';
import { apiSlice } from '../../../store/apiSlice';

const ReplyTo = ({ chat, reply_to }: { chat: Id; reply_to: Id }) => {
  const dispatch = useAppDispatch();
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

  const cancelReplyOrForward = useCallback(() => dispatch(messageInputCancel()), [dispatch]);

  return (
    <HStack background="panel-bg" padding="1">
      <Box width="0.2em" background="teal" alignSelf="stretch" />
      <Box width="0" flex="1">
        {user ? (
          <Text color="teal">in reply to @{user?.alias}</Text>
        ) : (
          <SkeletonText minWidth="10em" noOfLines={1} />
        )}
        {message ? (
          <MessageBody body={message.body} isPreview noOfLines={1} />
        ) : (
          <SkeletonText minWidth="10em" noOfLines={1} />
        )}
      </Box>
      <CloseButton onClick={cancelReplyOrForward} />
    </HStack>
  );
};

export default ReplyTo;
