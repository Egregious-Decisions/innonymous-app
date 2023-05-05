import { Flex, Hide } from '@chakra-ui/react';
import Menu from './components/menu/Menu';
import { Outlet, useParams } from 'react-router-dom';
import { useMemo } from 'react';

const Chats = () => {
  const { id } = useParams();

  const content = useMemo(
    () =>
      id === undefined ? (
        <>
          <Menu />
          <Hide below="md">
            <Outlet />
          </Hide>
        </>
      ) : (
        <>
          <Hide below="md">
            <Menu />
          </Hide>
          <Outlet />
        </>
      ),
    [id],
  );

  return (
    <Flex height="100%" alignItems="stretch" justifyContent="stretch">
      {content}
    </Flex>
  );
};

export default Chats;
