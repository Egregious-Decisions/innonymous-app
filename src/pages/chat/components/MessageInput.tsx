import { HStack, IconButton, Icon } from '@chakra-ui/react';
import { useCallback, useRef, KeyboardEvent, useEffect } from 'react';
import { MdAdd, MdSend } from 'react-icons/md';
import AutosizeTextarea from '../../../components/ui/AutosizeTextarea';
import { apiSlice } from '../../../store/apiSlice';
import { Id } from '../../../store/models';

const MessageInput = ({
  chat,
  reply_to,
  onMessageSent,
}: {
  chat: Id;
  reply_to?: Id;
  onMessageSent?: () => void;
}) => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [sendMessage, { isLoading }] = apiSlice.useCreateMessageMutation();

  useEffect(() => {
    if (isLoading || !onMessageSent) {
      return;
    }
    onMessageSent();
  }, [isLoading, onMessageSent]);

  const onSend = useCallback(async () => {
    if (messageRef.current === null || messageRef.current.value.trim() === '') {
      return;
    }

    await sendMessage({
      body: messageRef.current.value,
      replied_to: reply_to,
      chat,
    });

    messageRef.current.value = '';
  }, [chat, reply_to, sendMessage]);

  const sendOnEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || e.altKey || e.ctrlKey) {
        return;
      }
      e.preventDefault();
      onSend();
    },
    [onSend],
  );

  return (
    <HStack background="panel-bg" padding={2} alignItems="end">
      <IconButton aria-label="Add attachment" icon={<Icon as={MdAdd} />} />
      <AutosizeTextarea
        onKeyDown={sendOnEnter}
        ref={messageRef}
        placeholder="Message text"
        maxHeight="32"
        paddingY={2}
      />
      <IconButton
        colorScheme="teal"
        aria-label="Send message"
        icon={<Icon as={MdSend} />}
        onClick={onSend}
        isLoading={isLoading}
      />
    </HStack>
  );
};

export default MessageInput;
