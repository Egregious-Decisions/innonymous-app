import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import MessageTime from './MessageTime';
import { Message as MessageModel, MessageText } from '../../../../store/models';

const Message = ({ message }: { message: MessageModel }) => {
  const headerColor = useColorModeValue('gray.800', 'gray.200');
  const messagesColor = useColorModeValue('gray.200', 'gray.700');
  const myMessagesColor = useColorModeValue('teal.200', 'teal.500');

  return (
    <Card
      padding={2}
      background={message.author === 'me' ? myMessagesColor : messagesColor}
      maxWidth="xl"
    >
      <CardHeader padding={0} fontSize="sm" color={headerColor}>
        <HStack>
          <Text fontWeight="bold" noOfLines={1}>
            {message.author}
          </Text>
          <Spacer />
          <MessageTime created_at={message.created_at} updated_at={message.updated_at} />
        </HStack>
      </CardHeader>
      <CardBody padding={0}>
        <Text overflowWrap="anywhere">{(message.body as MessageText).data}</Text>
      </CardBody>
    </Card>
  );
};

export default Message;
