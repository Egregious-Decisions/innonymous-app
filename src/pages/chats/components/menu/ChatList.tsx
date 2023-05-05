import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import DateTime from '../../../../components/DateTime';
import { Chat } from '../../../../store/models';

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
    <VStack maxHeight="100%" alignItems="stretch" paddingX={2} overflowY="scroll">
      {chats.map(({ id, name, alias, updated_at, about }) => (
        <LinkBox>
          <LinkOverlay as={Link} to={id}>
            <Card key={id} padding={2}>
              <CardHeader padding={0}>
                <HStack>
                  <Text noOfLines={1}>{name}</Text>
                  <Text minWidth="fit-content" color="whiteAlpha.500">
                    {alias}
                  </Text>
                  <Spacer />
                  <Text minWidth="fit-content">
                    <DateTime time={updated_at} format="chat_time" />
                  </Text>
                </HStack>
              </CardHeader>
              <CardBody padding={0}>
                <Text noOfLines={1}>{about}</Text>
              </CardBody>
            </Card>
          </LinkOverlay>
        </LinkBox>
      ))}
    </VStack>
  );
};

export default ChatList;
