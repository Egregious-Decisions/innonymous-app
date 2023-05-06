import {
  Text,
  Input,
  Heading,
  VStack,
  HStack,
  Button,
  Spacer,
  FormControl,
  FormLabel,
  SystemStyleObject,
  useColorModeValue,
  Card,
  CardBody,
} from '@chakra-ui/react';
import ForgotLink from './components/ForgotLink';
import Background from './components/background.jpg';
import DarkThemeSwitch from './components/DarkThemeSwitch';
import { useAppDispatch } from '../../store/store';
import { useCallback } from 'react';
import { authSlice } from './authSlice';

const Login = () => {
  const bgFilter = useColorModeValue('invert(1)', '');

  const background: SystemStyleObject = {
    zIndex: -1,
    position: 'absolute',
    inset: 0,
    filter: bgFilter,
    bg: `url(${Background}) center/cover no-repeat`,
    content: `""`,
  };

  const darkModeSwitchId = 'dark-mode';

  const dispatch = useAppDispatch();

  const onLogIn = useCallback(() => dispatch(authSlice.actions.setToken('test')), [dispatch]);

  return (
    <VStack _before={background} divider={<Spacer border="none" />} padding="2" height="100%">
      <Card borderWidth="2px" textAlign="center">
        <CardBody>
          <Heading>Innonymous</Heading>
          <Text fontSize="xl">Welcome. Once again.</Text>
        </CardBody>
      </Card>
      <Card borderWidth="2px">
        <CardBody>
          <VStack>
            <Input placeholder="username" />
            <Input placeholder="password" type="password" />
            <HStack>
              <ForgotLink />
              <Button onClick={onLogIn} colorScheme="teal">
                log in
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
      <Card borderWidth="2px">
        <CardBody>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor={darkModeSwitchId} mb="0">
              dark mode
            </FormLabel>
            <DarkThemeSwitch id={darkModeSwitchId} />
          </FormControl>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default Login;
