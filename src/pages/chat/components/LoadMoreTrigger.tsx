import { Alert, AlertDescription, Center, Spinner, Text, useBoolean } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { apiSlice } from '../../../store/apiSlice';
import { Id } from '../../../store/models';
import NoMessages from './NoMessages';

const LoadMoreTrigger = ({ chat, before, limit }: { chat: Id; before: string; limit: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = entry?.isIntersecting;
  const [isEndReached, { on: onEndReached }] = useBoolean(false);

  const [loadMore, { isError }] = apiSlice.useLazyListMessagesQuery();

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    loadMore({ chat, limit, created_before: before })
      .unwrap()
      .then(({ messages }) => {
        if (messages.length === 1 && messages[0].created_at === before) {
          onEndReached();
        }
      });
  }, [before, chat, isVisible, limit, loadMore, onEndReached]);

  if (isError) {
    return (
      <Alert status="error">
        <AlertDescription>failed loading new messages</AlertDescription>
      </Alert>
    );
  }

  if (isEndReached) {
    return <div />;
  }

  return (
    <Center alignSelf="stretch">
      <Spinner ref={ref} size="lg" />
    </Center>
  );
};

export default LoadMoreTrigger;
