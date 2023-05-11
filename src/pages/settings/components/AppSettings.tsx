import { VStack, Button, CardBody, Card, Divider } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../../store/actions';
import { useAppDispatch } from '../../../store/store';
import DarkThemeSwitch from '../../../components/ui/DarkModeSwitch';

const AppSettings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onLogout = useCallback(() => {
    navigate('/');
    dispatch(authLogout());
  }, [dispatch, navigate]);

  return (
    <Card maxWidth="sm" margin="auto">
      <CardBody>
        <VStack>
          <DarkThemeSwitch />
          <Divider />
          <Button colorScheme="red" onClick={onLogout}>
            log out
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AppSettings;
