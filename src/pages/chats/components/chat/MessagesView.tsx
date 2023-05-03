import { VStack } from '@chakra-ui/react';
import Message from './Message';
import Lorem from '../../../../components/testing/Lorem';

const messages = [
  {
    id: 'a',
    author: 'bebra',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'b',
    author: 'bebra',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'c',
    author: 'bebra',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'd',
    author: 'bebra',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'e',
    author: 'bebra',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'f',
    author: 'bebra',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'g',
    author: 'bebra',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'h',
    author: 'bebra',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'i',
    author: 'me',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'i1',
    author: 'me',
    body: <Lorem />,
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'i2',
    author: 'me',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'i3',
    author: 'me',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'j',
    author: 'bebra',
    body: 'lol kek',
    updated_at: '2023-05-03T17:04:27.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
  {
    id: 'k',
    author: 'bebra',
    body: 'NO EDIT',
    updated_at: '2023-05-02T13:17:47.000Z',
    created_at: '2023-05-02T13:17:47.000Z',
  },
];

const MessagesView = () => {
  return (
    <VStack maxHeight="100%" alignItems="start" paddingX={2} overflowY="scroll">
      {messages.map(({ id, ...props }) => (
        <Message key={id} {...props} />
      ))}
    </VStack>
  );
};

export default MessagesView;
