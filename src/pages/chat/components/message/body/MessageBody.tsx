/* eslint-disable react/jsx-props-no-spreading */
import { memo } from 'react';
import { Text, TextProps, forwardRef } from '@chakra-ui/react';
import { MessageBody as BodyObject } from '../../../../../store/models';
import MessageFragment from './MessageFragment';
import ErrorFragment from './ErrorFragment';

const MessageBody = memo(
  forwardRef<{ body: BodyObject | string; isPreview?: boolean } & TextProps, 'p'>(
    ({ body, isPreview, ...props }, ref) => {
      if (typeof body === 'string') {
        return (
          <Text ref={ref} overflowWrap="anywhere" maxWidth="100%" {...props}>
            {body}
          </Text>
        );
      }

      if (body.type === 'files') {
        return (
          <Text as="i">
            <ErrorFragment>message type not supported yet</ErrorFragment>
          </Text>
        );
      }

      return (
        <Text ref={ref} overflowWrap="anywhere" maxWidth="100%" {...props}>
          {body.fragments.map((fragment, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <MessageFragment key={i} {...{ fragment, isPreview }} />
          ))}
        </Text>
      );
    },
  ),
);
MessageBody.displayName = 'MessageBody';

export default MessageBody;
