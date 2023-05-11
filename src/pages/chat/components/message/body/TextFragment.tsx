import { useMemo } from 'react';
import { Text } from '@chakra-ui/react';
import { MessageTextFragment } from '../../../../../store/models';

const TextFragment = ({ fragment: { style, text } }: { fragment: MessageTextFragment }) => {
  const as = useMemo(() => {
    switch (style) {
      case 'bold':
        return 'b';
      case 'italic':
        return 'i';
      case 'monospace':
        return 'code';
      case 'strikethrough':
        return 's';
      default:
        return 'span';
    }
  }, [style]);

  return (
    <Text as={as} whiteSpace="break-spaces">
      {text}
    </Text>
  );
};

export default TextFragment;
