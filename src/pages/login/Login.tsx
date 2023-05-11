import {
  Text,
  Heading,
  VStack,
  Spacer,
  SystemStyleObject,
  useColorModeValue,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Background from './components/background.jpg';
import DarkThemeSwitch from '../../components/ui/DarkModeSwitch';

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
          <DarkThemeSwitch />
        </CardBody>
      </Card>
    </VStack>
  );
};

export default Login;
