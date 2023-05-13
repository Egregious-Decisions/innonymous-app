import { Flex, Hide } from '@chakra-ui/react';
import { useMemo } from 'react';
import Menu from './Menu';
import MainView from './MainView';
import { apiSlice } from '../../store/apiSlice';
import { useAppRouteParams } from '../../hooks';

const Layout = () => {
  const { alias } = useAppRouteParams();
  apiSlice.useReceiveUpdatesQuery();

  const content = useMemo(
    () =>
      alias === undefined ? (
        <>
          <Menu />
          <Hide below="md">
            <MainView />
          </Hide>
        </>
      ) : (
        <>
          <Hide below="md">
            <Menu />
          </Hide>
          <MainView />
        </>
      ),
    [alias],
  );

  return (
    <Flex height="100%" alignItems="stretch" justifyContent="stretch">
      {content}
    </Flex>
  );
};

export default Layout;
