import { VStack, useColorModeValue } from '@chakra-ui/react';
import MessageItem from './MessageItem';
import { Message } from '../../../../store/models';

const messages: Message[] = [
  {
    id: 'a',
    author: 'bebra',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'b',
    author: 'bebra',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'c',
    author: 'bebra',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'd',
    author: 'bebra',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'e',
    author: 'bebra',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'f',
    author: 'bebra',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'g',
    author: 'bebra',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'h',
    author: 'bebra',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'i',
    author: 'me',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'i1',
    author: 'me',
    chat: 'any',
    body: {
      data: 'kdo[wakok[pdk[pawkpk[dk[pwka[skfopcjoiehsoijfeicpkopaksopjpicjfpipiaspicfjpesjdoiovnfusdnuonvoinoeisnoifncoififosoinfoidsoioifj0asjoijficjipwaswjijfiojaipsjoifhoihasoihofdoisjiojoifjoasihoifhuohaoushofhcioshoihfcfoihaosihiofhdcioahsoihfijoiashoi',
    },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'i2',
    author: 'me',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'i3',
    author: 'me',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'j',
    author: 'bebra',
    chat: 'any',
    body: { data: 'lol kek' },
    updated_at: new Date('2023-05-03T17:04:27.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
  {
    id: 'k',
    author: 'bebra',
    chat: 'any',
    body: { data: 'NO EDIT' },
    updated_at: new Date('2023-05-02T13:17:47.000Z'),
    created_at: new Date('2023-05-02T13:17:47.000Z'),
  },
];

const MessagesView = () => {
  const bgColor = useColorModeValue('green.200', 'blackAlpha.500');

  return (
    <VStack
      background={bgColor}
      maxHeight="100%"
      alignItems="start"
      paddingX={2}
      overflowY="scroll"
    >
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </VStack>
  );
};

export default MessagesView;
