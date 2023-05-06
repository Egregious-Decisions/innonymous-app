import { Divider, VStack } from '@chakra-ui/react';
import { Chat } from '../../../../store/models';
import ChatItem from './ChatItem';

const chats: Chat[] = [
  {
    id: '1',
    name: "very very long chat name that can't fit into the space",
    alias: 'amonga',
    updated_at: new Date('2023-05-03T13:17:47.000Z'),
    about: 'And a very long text too: amogus sus gregtech new horizons bamog',
  },
  {
    id: '2',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2022-05-03T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: '3',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: '4',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-03T10:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: '5',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-04-03T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: '6',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-03T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: '7',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-03T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: '8',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-03T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: '9',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: '0',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: 'a',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: 'b',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: 'c',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: 'd',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: 'e',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: 'f',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: 'g',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
  {
    id: 'h',
    name: 'chat 1',
    alias: 'aboba',
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    about: 'hello world!',
  },
];

const ChatList = () => {
  return (
    <VStack
      divider={<Divider />}
      spacing="-0.5"
      maxHeight="100%"
      alignItems="stretch"
      overflowY="scroll"
    >
      {chats.map((chat) => (
        <ChatItem chat={chat} key={chat.id} />
      ))}
    </VStack>
  );
};

export default ChatList;
