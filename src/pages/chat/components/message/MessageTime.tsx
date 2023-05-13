import { Tooltip, Icon, Text, Center, Box, Spinner } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import DateTime from '../../../../components/ui/DateTime';

interface MessageTimeProps {
  updated_at?: Date;
  created_at: Date;
  isPending?: boolean;
}

const MessageTime = ({ updated_at, created_at, isPending }: MessageTimeProps) => {
  const isEdited = updated_at && created_at.getTime() !== updated_at.getTime();
  return (
    <Tooltip
      fontSize="sm"
      label={
        <Box whiteSpace="nowrap">
          <Text>
            Sent on <DateTime time={created_at} format="full" />
          </Text>
          {isEdited && updated_at && (
            <Text>
              Edited: <DateTime time={updated_at} format="full" />
            </Text>
          )}
        </Box>
      }
    >
      <Center flexDirection="row">
        {isEdited && <Icon as={AiFillEdit} />}
        {isPending && <Spinner size="xs" />}
        <Text minWidth="fit-content">
          <DateTime time={created_at} format="time" />
        </Text>
      </Center>
    </Tooltip>
  );
};

export default MessageTime;
