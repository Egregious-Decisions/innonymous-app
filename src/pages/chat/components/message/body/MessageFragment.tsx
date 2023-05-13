import { MessageFragment as FragmentObject } from '../../../../../store/models';
import MentionFragment from './mentions/MentionFragment';
import ErrorFragment from './ErrorFragment';
import TextFragment from './TextFragment';
import LinkFragment from './LinkFragment';

const MessageFragment = ({
  fragment,
  isPreview,
}: {
  fragment: FragmentObject;
  isPreview?: boolean;
}) => {
  switch (fragment.type) {
    case 'link':
      return <LinkFragment {...{ fragment, isPreview }} />;
    case 'mention':
      return <MentionFragment mention={fragment.mention} isPreview={isPreview} />;
    case 'text':
      return <TextFragment {...{ fragment, isPreview }} />;
    default:
      return <ErrorFragment>[unknown entity]</ErrorFragment>;
  }
};

export default MessageFragment;
