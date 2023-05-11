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
        return 'pre';
      default:
        return undefined;
    }
  }, [style]);

  return <Text as={as}>{text}</Text>;
};

export default TextFragment;
