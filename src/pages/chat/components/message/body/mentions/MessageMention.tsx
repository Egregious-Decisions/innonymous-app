import { Link, Skeleton } from '@chakra-ui/react';
import { apiSlice } from '../../../../../../store/apiSlice';
import { Id } from '../../../../../../store/models';
import AppRouteLink from '../../../../../../components/ui/AppLink';

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
    return (
      <Skeleton as="span" noOfLines={1}>
        @username
      </Skeleton>
    );
  }

  return (
    <Link as={AppRouteLink} color="message-link" to={`/${chatData?.alias}/${messageData?.id}`}>
      @{chatData?.alias}/message
    </Link>
  );
};

export default MessageMention;
