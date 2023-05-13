import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Link,
  SkeletonText,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import MessageTime from './MessageTime';
import MessageBody from './body/MessageBody';
import { apiSlice } from '../../../../store/apiSlice';
import { Message } from '../../../../store/models';
import AppRouteLink from '../../../../components/ui/AppLink';

const MessageItem = ({ message }: { message: Message }) => {
  const headerColor = useColorModeValue('gray.800', 'gray.200');
  const messagesColor = useColorModeValue('gray.50', 'gray.700');
  const myMessagesColor = useColorModeValue('teal.100', 'teal.800');
  const { data } = apiSlice.useGetCurrentUserQuery();
  const { data: authorData } = apiSlice.useGetUserQuery({ user: message.author });

  return (
    <Card
      padding={2}
      background={message.author === data?.id ? myMessagesColor : messagesColor}
      maxWidth={['xs', 'sm', null, 'md', 'lg']}
    >
      <CardHeader padding={0} fontSize="sm" color={headerColor}>
        <HStack>
          {authorData ? (
            <Link as={AppRouteLink} fontWeight="bold" noOfLines={1} to={`/${authorData.alias}`}>
              {authorData.name || authorData.alias}
            </Link>
          ) : (
            <SkeletonText noOfLines={1}>Message author</SkeletonText>
          )}
          <Spacer />
          <MessageTime
            created_at={new Date(message.created_at)}
            updated_at={new Date(message.updated_at)}
          />
        </HStack>
      </CardHeader>
      <CardBody padding={0}>
        <MessageBody body={message.body} />
      </CardBody>
    </Card>
  );
};

export default MessageItem;
