import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { MdReply } from 'react-icons/md';
import MessageTime from './MessageTime';
import MessageBody from './body/MessageBody';
import { apiSlice } from '../../../../store/apiSlice';
import { Message } from '../../../../store/models';
import { FailedMessage, messageInputReply } from '../../../../store/actions';
import MessageAuthor from './MessageAuthor';
import { useAppDispatch } from '../../../../store/store';
import ReplyTo from '../ReplyTo';

const isFailed = (message: Message | FailedMessage): message is FailedMessage =>
  !('author' in message);

const MessageItem = ({ message }: { message: Message | FailedMessage }) => {
  const headerColor = useColorModeValue('gray.800', 'gray.200');
  const messagesColor = useColorModeValue('gray.50', 'gray.700');
  const myMessagesColor = useColorModeValue('teal.100', 'teal.800');
  const { data } = apiSlice.useGetCurrentUserQuery();
  const dispatch = useAppDispatch();
  const [getUser, { data: authorData }] = apiSlice.useLazyGetUserQuery();

  useEffect(() => {
    if (isFailed(message)) {
      return;
    }
    getUser({ user: message.author });
  }, [data, getUser, message]);

  const onReply = useCallback(() => {
    if (isFailed(message)) {
      return;
    }
    dispatch(messageInputReply(message.id));
  }, [dispatch, message]);

  return (
    <HStack alignItems="end">
      <Card
        padding={2}
        background={
          !('author' in message) || message.author === data?.id ? myMessagesColor : messagesColor
        }
        maxWidth={['18em', 'sm', null, 'md', 'lg']}
      >
        <CardHeader padding={0} fontSize="sm" color={headerColor}>
          <HStack>
            <MessageAuthor author={authorData ?? data} />
            <Spacer />
            <MessageTime
              created_at={new Date(message.created_at)}
              updated_at={isFailed(message) ? undefined : new Date(message.updated_at)}
              isFailed={isFailed(message)}
            />
          </HStack>
        </CardHeader>
        <CardBody padding={0}>
          {message.replied_to && (
            <Flex>
              <ReplyTo chat={message.chat} reply_to={message.replied_to} />
            </Flex>
          )}
          <MessageBody body={message.body} />
        </CardBody>
      </Card>
      {!isFailed(message) && (
        <IconButton
          size="sm"
          variant="solid"
          colorScheme="gray"
          aria-label="reply"
          icon={<Icon as={MdReply} />}
          onClick={onReply}
        />
      )}
    </HStack>
  );
};

export default MessageItem;
