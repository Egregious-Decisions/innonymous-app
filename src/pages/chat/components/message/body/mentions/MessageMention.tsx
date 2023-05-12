import { Link, SkeletonText } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import { apiSlice } from '../../../../../../store/apiSlice';
import { Id } from '../../../../../../store/models';

const MessageMention = ({ message, chat }: { message: Id; chat: Id }) => {
  const { data: messageData, isLoading, isError } = apiSlice.useGetMessageQuery({ chat, message });
  const {
    data: chatData,
    isLoading: isLoadingChat,
    isError: isChatError,
  } = apiSlice.useGetChatQuery({ chat });

  if (isError) {
    return <span color="gray">@[message not found]</span>;
  }
  if (isChatError) {
    return <span color="gray">@[chat not found]</span>;
  }
  if (isLoading || isLoadingChat) {
    return <SkeletonText>@username</SkeletonText>;
  }

  return (
    <Link as={RouteLink} color="message-link" to={`/${chatData?.alias}/${messageData?.id}`}>
      @{chatData?.alias}/message
    </Link>
  );
};

export default MessageMention;
