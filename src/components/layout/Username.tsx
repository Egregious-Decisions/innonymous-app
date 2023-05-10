import { Box, SkeletonText, Text } from '@chakra-ui/react';
import { apiSlice } from '../../store/apiSlice';

const Username = () => {
  const { isFetching, data } = apiSlice.useGetCurrentUserQuery();

  if (isFetching || data === undefined) {
    return (
      <SkeletonText flex="1" noOfLines={2}>
        Username
      </SkeletonText>
    );
  }

  if (data.name === '') {
    return (
      <Text noOfLines={1} flex="1">
        {data.alias}
      </Text>
    );
  }

  return (
    <Box width="0" flex="1">
      <Text noOfLines={1}>{data.name}</Text>
      <Text noOfLines={1} color="gray">
        {data.alias}
      </Text>
    </Box>
  );
};

export default Username;
