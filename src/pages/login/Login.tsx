import {
  Text,
  Heading,
  VStack,
  Spacer,
  FormControl,
  FormLabel,
  SystemStyleObject,
  useColorModeValue,
  Card,
  CardBody,
  useBoolean,
} from '@chakra-ui/react';
import Background from './components/background.jpg';
import DarkThemeSwitch from './components/DarkThemeSwitch';
import { Outlet } from 'react-router-dom';

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
          <Outlet />
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
