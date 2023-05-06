import { HStack, chakra } from '@chakra-ui/react';

const Header = chakra(HStack, {
  baseStyle: {
    background: 'panel-bg',
    padding: 5,
  },
});

export default Header;
