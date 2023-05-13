import { Link, Skeleton, Text } from '@chakra-ui/react';
import { apiSlice } from '../../../../../../store/apiSlice';
import { Id } from '../../../../../../store/models';
import ErrorFragment from '../ErrorFragment';
import AppRouteLink from '../../../../../../components/ui/AppLink';

const ChatMention = ({ chat, isPreview }: { chat: Id; isPreview?: boolean }) => {
  const { data, isLoading, isError } = apiSlice.useGetChatQuery({ chat });

  if (isError) {
    return <ErrorFragment>@[chat not found]</ErrorFragment>;
  }

  if (isLoading) {
    return (
      <Skeleton as="span" noOfLines={1}>
        @chat_link
      </Skeleton>
    );
  }

  if (isPreview) {
    return <Text>@{data?.alias}</Text>;
  }

  return (
    <Link as={AppRouteLink} color="message-link" to={`/${data?.alias}`}>
      @{data?.alias}
    </Link>
  );
};

export default ChatMention;
