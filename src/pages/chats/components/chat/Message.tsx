import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import MessageTime from './MessageTime';

interface MessageProps {
  author: string;
  body: string | ReactNode;
  created_at: string;
  updated_at: string;
}

const Message = ({ author, body, created_at, updated_at }: MessageProps) => {
  const headerColor = useColorModeValue('gray.800', 'gray.200');
  const messagesColor = useColorModeValue('gray.200', 'gray.700');
  const myMessagesColor = useColorModeValue('teal.200', 'teal.500');

  return (
    <Card padding={2} background={author === 'me' ? myMessagesColor : messagesColor} maxWidth="xl">
      <CardHeader padding={0} fontSize="sm" color={headerColor}>
        <HStack>
          <Text fontWeight="bold" noOfLines={1}>
            {author}
          </Text>
          <Spacer />
          <MessageTime {...{ created_at, updated_at }} />
        </HStack>
      </CardHeader>
      <CardBody padding={0}>
        <Text>{body}</Text>
      </CardBody>
    </Card>
  );
};

export default Message;
