import { Link } from '@chakra-ui/react';
import { MessageFragment as FragmentObject } from '../../../../../store/models';
import MentionFragment from './mentions/MentionFragment';
import ErrorFragment from './ErrorFragment';
import TextFragment from './TextFragment';

const MessageFragment = ({ fragment }: { fragment: FragmentObject }) => {
  switch (fragment.type) {
    case 'link':
      return (
        <Link href={fragment.link} color="message-link" textDecoration="1px solid underline">
          {fragment.text || fragment.link}
        </Link>
      );
    case 'mention':
      return <MentionFragment mention={fragment.mention} />;
    case 'text':
      return <TextFragment fragment={fragment} />;
    default:
      return <ErrorFragment>[unknown entity]</ErrorFragment>;
  }
};

export default MessageFragment;
