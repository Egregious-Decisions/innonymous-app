import { Link, Skeleton } from '@chakra-ui/react';
import { apiSlice } from '../../../../../../store/apiSlice';
import { Id } from '../../../../../../store/models';
import ErrorFragment from '../ErrorFragment';
import AppRouteLink from '../../../../../../components/ui/AppLink';

const ChatMention = ({ chat }: { chat: Id }) => {
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

  return (
    <Link as={AppRouteLink} color="message-link" to={`/${data?.alias}`}>
      @{data?.alias}
    </Link>
  );
};

export default ChatMention;
