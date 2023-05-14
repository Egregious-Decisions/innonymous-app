import { HStack, IconButton, Icon, VStack, CloseButton } from '@chakra-ui/react';
import { useCallback, useRef, KeyboardEvent, useEffect } from 'react';
import { MdSend } from 'react-icons/md';
import AutosizeTextarea from '../../../components/ui/AutosizeTextarea';
import { apiSlice } from '../../../store/apiSlice';
import { Id } from '../../../store/models';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import ReplyTo from './ReplyTo';
import { messageInputCancel } from '../../../store/actions';

const MessageInput = ({ chat, onMessageSent }: { chat: Id; onMessageSent?: () => void }) => {
  const dispatch = useAppDispatch();
  const { reply_to } = useAppSelector((state) => state.input);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [sendMessage, { isLoading }] = apiSlice.useCreateMessageMutation();

  useEffect(() => {
    if (isLoading || !onMessageSent) {
      return;
    }
    onMessageSent();
  }, [isLoading, onMessageSent]);

  useEffect(() => {
    messageRef.current?.focus();
  }, [reply_to]);

  const cancelReplyOrForward = useCallback(() => dispatch(messageInputCancel()), [dispatch]);

  const onSend = useCallback(async () => {
    if (messageRef.current === null || messageRef.current.value.trim() === '') {
      return;
    }

    const message = {
      body: messageRef.current.value,
      replied_to: reply_to,
      chat,
    };

    messageRef.current.value = '';
    cancelReplyOrForward();

    await sendMessage(message);
  }, [cancelReplyOrForward, chat, reply_to, sendMessage]);

  const onSendClick = useCallback(async () => {
    messageRef.current?.focus();
    await onSend();
  }, [onSend]);

  const sendOnEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== 'Enter' || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
        return;
      }
      e.preventDefault();
      onSend();
    },
    [onSend],
  );

  return (
    <VStack spacing={0} alignItems="stretch">
      {reply_to && (
        <HStack background="panel-bg" padding="1">
          <ReplyTo chat={chat} reply_to={reply_to} />
          <CloseButton onClick={cancelReplyOrForward} />
        </HStack>
      )}
      <HStack background="panel-bg" padding={2} alignItems="end">
        {/* <IconButton aria-label="Add attachment" icon={<Icon as={MdAdd} />} /> */}
        <AutosizeTextarea
          onKeyDown={sendOnEnter}
          maxLength={1024}
          ref={messageRef}
          placeholder="Message text"
          paddingY={2}
        />
        <IconButton
          colorScheme="teal"
          aria-label="Send message"
          icon={<Icon as={MdSend} />}
          onClick={onSendClick}
          isLoading={isLoading}
        />
      </HStack>
    </VStack>
  );
};

export default MessageInput;
