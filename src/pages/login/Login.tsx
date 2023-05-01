import { Text, Input, Heading, VStack, HStack, Link, Button, Spacer, Box } from '@chakra-ui/react';
import Background from './components/background.jpg';
import Panel from './components/Panel';

const Login = () => (
  <VStack
    divider={<Spacer border="none" />}
    paddingTop={2}
    height="100vh"
    bg={`url(${Background}) center/cover no-repeat`}
  >
    <Panel color="white">
      <Heading>Innonymous</Heading>
      <Text fontSize="xl">Welcome. Once again.</Text>
    </Panel>
    <Panel>
      <Input color="gray.200" placeholder="username" />
      <Input color="gray.200" placeholder="password" type="password" />
      <HStack>
        <Link color="gray.400">forgor💀 credentials?</Link>
        <Button>log in</Button>
      </HStack>
    </Panel>
    <Box height={20} />
  </VStack>
);

export default Login;
