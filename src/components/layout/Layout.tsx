import { Flex, Hide } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import Menu from './Menu';
import MainView from './MainView';

const Layout = () => {
  const { chat } = useParams();

  const content = useMemo(
    () =>
      chat === undefined ? (
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
    [chat],
  );

  return (
    <Flex height="100%" alignItems="stretch" justifyContent="stretch">
      {content}
    </Flex>
  );
};

export default Layout;
