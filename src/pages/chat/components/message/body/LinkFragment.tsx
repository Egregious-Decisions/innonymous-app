import { Link, Text } from '@chakra-ui/react';
import { MessageLinkFragment } from '../../../../../store/models';

const LinkFragment = ({
  fragment: { link, text },
  isPreview,
}: {
  fragment: MessageLinkFragment;
  isPreview?: boolean;
}) => {
  if (isPreview) {
    return <Text>{text || link}</Text>;
  }

  return (
    <Link href={link} color="message-link" textDecoration="1px solid underline">
      {text || link}
    </Link>
  );
};

export default LinkFragment;
