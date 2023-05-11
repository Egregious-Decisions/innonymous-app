import { Text } from '@chakra-ui/react';
import { MessageBody as BodyObject } from '../../../../../store/models';
import MessageFragment from './MessageFragment';
import ErrorFragment from './ErrorFragment';

const MessageBody = ({ body }: { body: BodyObject }) => {
  if (body.type === 'files') {
    return (
      <Text as="i">
        <ErrorFragment>message type not supported yet</ErrorFragment>
      </Text>
    );
  }

  return (
    <Text overflowWrap="anywhere" maxWidth="100%">
      {body.fragments.map((fragment, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <MessageFragment key={i} fragment={fragment} />
      ))}
    </Text>
  );
};

export default MessageBody;
