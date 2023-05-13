import { Text, TextProps, forwardRef } from '@chakra-ui/react';
import { MessageBody as BodyObject } from '../../../../../store/models';
import MessageFragment from './MessageFragment';
import ErrorFragment from './ErrorFragment';

const MessageBody = forwardRef<{ body: BodyObject; isPreview?: boolean } & TextProps, 'p'>(
  ({ body, isPreview, ...props }, ref) => {
    if (body.type === 'files') {
      return (
        <Text as="i">
          <ErrorFragment>message type not supported yet</ErrorFragment>
        </Text>
      );
    }

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Text ref={ref} overflowWrap="anywhere" maxWidth="100%" {...props}>
        {body.fragments.map((fragment, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <MessageFragment key={i} {...{ fragment, isPreview }} />
        ))}
      </Text>
    );
  },
);

export default MessageBody;
