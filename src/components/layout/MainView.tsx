import { useMemo } from 'react';
import { Box, SystemStyleObject, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Background from './main_bg.jpg';

const MainView = () => {
  const bgFilter = useColorModeValue('invert(1)', '');

  const background = useMemo<SystemStyleObject>(
    () => ({
      zIndex: -1,
      position: 'absolute',
      inset: 0,
      filter: bgFilter,
      opacity: 0.3,
      bg: `url(${Background}) 0% 50%/auto 100% no-repeat, black`,
      content: `""`,
    }),
    [bgFilter],
  );

  return (
    <Box flex="2" position="relative" _before={background}>
      <Outlet />
    </Box>
  );
};

export default MainView;
