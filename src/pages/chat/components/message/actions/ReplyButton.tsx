import { Icon, IconButton } from '@chakra-ui/react';
import { memo } from 'react';
import { MdReply } from 'react-icons/md';

const ReplyButton = memo(({ onReply }: { onReply: () => void }) => (
  <IconButton
    size="sm"
    variant="solid"
    colorScheme="gray"
    aria-label="reply"
    icon={<Icon as={MdReply} />}
    onClick={onReply}
  />
));
ReplyButton.displayName = 'ReplyButton';

export default ReplyButton;
