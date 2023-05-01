import { VStack, chakra } from '@chakra-ui/react';

const Panel = chakra(VStack, {
  baseStyle: {
    background: 'gray.800',
    border: 'white 2px solid',
    padding: 4,
    borderRadius: 10,
  },
});

export default Panel;
