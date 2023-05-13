import { Mention } from '../../../../../../store/models';
import UserMention from './UserMention';
import ChatMention from './ChatMention';
import ErrorFragment from '../ErrorFragment';
import MessageMention from './MessageMention';

const MentionFragment = ({ mention, isPreview }: { mention: Mention; isPreview?: boolean }) => {
  switch (mention.type) {
    case 'user':
      return <UserMention user={mention.user} isPreview={isPreview} />;
    case 'chat':
      return <ChatMention chat={mention.chat} isPreview={isPreview} />;
    case 'message':
      return <MessageMention chat={mention.chat} message={mention.message} isPreview={isPreview} />;
    default:
      return <ErrorFragment>[unknown mention type]</ErrorFragment>;
  }
};

export default MentionFragment;
