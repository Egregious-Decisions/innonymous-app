import { Mention } from '../../../../../../store/models';
import UserMention from './UserMention';
import ChatMention from './ChatMention';
import ErrorFragment from '../ErrorFragment';
import MessageMention from './MessageMention';

const MentionFragment = ({ mention }: { mention: Mention }) => {
  switch (mention.type) {
    case 'user':
      return <UserMention user={mention.user} />;
    case 'chat':
      return <ChatMention chat={mention.chat} />;
    case 'message':
      return <MessageMention chat={mention.chat} message={mention.message} />;
    default:
      return <ErrorFragment>[unknown mention type]</ErrorFragment>;
  }
};

export default MentionFragment;
