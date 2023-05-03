import { Card, CardBody, CardHeader, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import DateTime from '../../../../components/DateTime';

const chats = [
  {
    id: '1',
    name: "very very long chat name that can't fit into the space",
    owner: 'aboba_user',
    last_active: '2023-05-03T13:17:47.000Z',
    last_message: 'And a very long text too: amogus sus gregtech new horizons bamog',
  },
  {
    id: '2',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2022-05-03T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: '3',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: '4',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-03T10:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: '5',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-04-03T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: '6',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-03T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: '7',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-03T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: '8',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-03T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: '9',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: '0',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: 'a',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: 'b',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: 'c',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: 'd',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: 'e',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: 'f',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: 'g',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
  {
    id: 'h',
    name: 'chat 1',
    owner: 'aboba_user',
    last_active: '2023-05-02T13:17:47.000Z',
    last_message: 'hello world!',
  },
];

const ChatList = () => {
  return (
    <VStack maxHeight="100%" alignItems="stretch" paddingX={2} overflowY="scroll">
      {chats.map(({ id, name, owner, last_active, last_message }) => (
        <Card key={id} padding={2}>
          <CardHeader padding={0}>
            <HStack>
              <Text noOfLines={1}>{name}</Text>
              <Text minWidth="fit-content" color="whiteAlpha.500">
                by {owner}
              </Text>
              <Spacer />
              <Text minWidth="fit-content">
                <DateTime time={last_active} format="chat_time" />
              </Text>
            </HStack>
          </CardHeader>
          <CardBody padding={0}>
            <Text noOfLines={1}>{last_message}</Text>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

export default ChatList;
