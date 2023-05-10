import { TextareaProps, Textarea } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import { forwardRef } from 'react';

// Based on https://github.com/chakra-ui/chakra-ui/issues/670#issuecomment-669916624
const AutosizeTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => (
  <Textarea
    minHeight="unset"
    resize="none"
    ref={ref}
    minRows={1}
    maxRows={5}
    as={ResizeTextarea}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));

export default AutosizeTextarea;
