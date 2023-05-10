import { Link, Text } from '@chakra-ui/react';
import { MessageBody as BodyObject, MessageFragment } from '../../../store/models';

const fragmentToComponent = (fragment: MessageFragment) => {
  switch (fragment.type) {
    case 'link':
      return <Link href={fragment.link}>{fragment.text}</Link>;
    case 'mention':
      // return <MentionFragment mention={fragment.mention} />;
      return <span>[{fragment.mention.type} mention]</span>;
    case 'text':
      // return <TextFragment text={fragment.text} />;
      return <span>{fragment.text}</span>;
    default:
      return <span color="gray">[unknown entity]</span>;
  }
};

const MessageBody = ({ body }: { body: BodyObject }) => {
  if (body.type === 'files') {
    return (
      <Text as="i" color="gray">
        message type not supported yet
      </Text>
    );
  }

  return <Text overflowWrap="anywhere">{body.fragments.map(fragmentToComponent)}</Text>;
};

export default MessageBody;
