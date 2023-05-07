import {
  VStack,
  Input,
  HStack,
  Button,
  Divider,
  Text,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRef, useCallback, useMemo } from 'react';
import { apiSlice, getErrorMessage } from '../../../store/apiSlice';
import ForgotLink from './ForgotLink';
import { Form } from 'react-router-dom';

const LoginForm = ({ onNewAccount }: { onNewAccount: () => void }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [logIn, { error, isError }] = apiSlice.useCreateSessionMutation();

  const onLogIn = useCallback(async () => {
    if (usernameRef.current === null || passwordRef.current === null) {
      return;
    }

    await logIn({ alias: usernameRef.current.value, password: passwordRef.current.value });
  }, [logIn]);

  const errorMessage = useMemo(
    () => (error !== undefined ? getErrorMessage(error, 'Invalid username or password.') : error),
    [error],
  );

  return (
    <Form onSubmit={onLogIn}>
      <VStack>
        <Input ref={usernameRef} placeholder="username" isRequired />
        <Input ref={passwordRef} placeholder="password" isRequired type="password" />
        <FormControl isInvalid={isError}>
          <FormErrorMessage justifyContent="center">{errorMessage}</FormErrorMessage>
        </FormControl>
        <HStack>
          <ForgotLink />
          <Button type="submit" colorScheme="teal">
            log in
          </Button>
        </HStack>
        <Divider paddingY={2} />
        <Text>no account yet?</Text>
        <Button onClick={onNewAccount}>join the dark side</Button>
      </VStack>
    </Form>
  );
};

export default LoginForm;
