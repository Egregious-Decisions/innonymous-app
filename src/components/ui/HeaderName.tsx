import { Box, SkeletonText, Text } from '@chakra-ui/react';

export interface HeaderNameProps {
  isLoading: boolean;
  name: string;
  alias: string;
}

const HeaderName = ({ isLoading, name, alias }: HeaderNameProps) => {
  if (isLoading) {
    return (
      <SkeletonText flex="1" noOfLines={2}>
        entity name
      </SkeletonText>
    );
  }

  if (name === '') {
    return (
      <Text noOfLines={1} flex="1">
        {alias}
      </Text>
    );
  }

  return (
    <Box width="0" flex="1">
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1} color="gray">
        {alias}
      </Text>
    </Box>
  );
};

export default HeaderName;
