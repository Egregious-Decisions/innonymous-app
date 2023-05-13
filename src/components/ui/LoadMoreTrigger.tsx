import { Alert, AlertDescription, Center, Spinner } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

const LoadMoreTrigger = ({
  load,
  isEndReached,
  isError,
  error,
}: {
  load: () => void;
  isEndReached: boolean;
  error: string;
  isError: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = entry?.isIntersecting;

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    load();
  }, [isVisible, load]);

  if (isError) {
    return (
      <Alert status="error">
        <AlertDescription>{error}</AlertDescription>
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
