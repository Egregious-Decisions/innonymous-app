import { Box, Flex, Hide, SystemStyleObject, useColorModeValue } from '@chakra-ui/react';
import { Outlet, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import Menu from './components/menu/Menu';
import Background from './components/chat_bg.jpg';

const Chats = () => {
  const { id } = useParams();
  const bgFilter = useColorModeValue('invert(1)', '');

  const content = useMemo(() => {
    const background: SystemStyleObject = {
      zIndex: -1,
      position: 'absolute',
      inset: 0,
      filter: bgFilter,
      opacity: 0.3,
      bg: `url(${Background}) 0% 50%/auto 100% no-repeat, black`,
      content: `""`,
    };

    const wrappedOutlet = (
      <Box flex="2" position="relative" _before={background}>
        <Outlet />
      </Box>
    );

    return id === undefined ? (
      <>
        <Menu />
        <Hide below="md">{wrappedOutlet}</Hide>
      </>
    ) : (
      <>
        <Hide below="md">
          <Menu />
        </Hide>
        {wrappedOutlet}
      </>
    );
  }, [id, bgFilter]);

  return (
    <Flex height="100%" alignItems="stretch" justifyContent="stretch">
      {content}
    </Flex>
  );
};

export default Chats;
