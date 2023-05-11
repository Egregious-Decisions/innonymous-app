import { Link, SkeletonText } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import { apiSlice } from '../../../../../../store/apiSlice';
import { Id } from '../../../../../../store/models';
import ErrorFragment from '../ErrorFragment';

const ChatMention = ({ chat }: { chat: Id }) => {
  const { data, isLoading, isError } = apiSlice.useGetChatQuery({ chat });

  if (isError) {
    return <ErrorFragment>@[chat not found]</ErrorFragment>;
  }

  if (isLoading) {
    return <SkeletonText>@chat_link</SkeletonText>;
  }

  return (
    <Link as={RouteLink} to={`/${data?.alias}`}>
      @{data?.alias}
    </Link>
  );
};

export default ChatMention;
