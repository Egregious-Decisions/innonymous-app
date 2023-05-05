import { Grid } from '@chakra-ui/react';
import Menu from './components/menu/Menu';
import { Outlet } from 'react-router-dom';

const Chats = () => {
  return (
    <Grid
      height="100%"
      gridTemplateColumns="480px auto"
      alignItems="stretch"
      justifyContent="stretch"
    >
      <Menu />
      <Outlet />
    </Grid>
  );
};

export default Chats;
