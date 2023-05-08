import {
  VStack,
  Input,
  Button,
  Divider,
  HStack,
  Text,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useRef, useCallback, useMemo, useState } from 'react';
import { apiSlice, getErrorMessage } from '../../../store/apiSlice';
import Captcha from '../../../components/Captcha';
import { CaptchaSolution } from '../../../store/models';
import { Form, useNavigate } from 'react-router-dom';

const LoginForm = ({ logInUrl }: { logInUrl: string }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const [captcha, setCaptcha] = useState<CaptchaSolution | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [createUser, { isError: isCreateError, error: createError }] =
    apiSlice.useCreateUserMutation();
  const [logIn, { isError: isLoginError, error: loginError }] = apiSlice.useCreateSessionMutation();
  const navigate = useNavigate();

  const onCreateUser = useCallback(async () => {
    if (usernameRef.current === null || passwordRef.current === null || captcha == null) {
      return;
    }

    const credentials = { alias: usernameRef.current.value, password: passwordRef.current.value };

    await createUser({ captcha, credentials })
      .unwrap()
      .then(() => logIn(credentials));
  }, [captcha, createUser, logIn]);

  const onConfirmPasswordChanged = useCallback(() => {
    setPasswordsMatch(
      confirmRef.current?.value === '' || passwordRef.current?.value === confirmRef.current?.value,
    );
  }, []);

  const errorMessage = useMemo(() => {
    if (createError !== undefined) {
      return getErrorMessage(createError);
    }
    if (loginError !== undefined) {
      return getErrorMessage(loginError);
    }
    return undefined;
  }, [createError, loginError]);

  return (
    <Form onSubmit={onCreateUser}>
      <VStack>
        <FormControl>
          <Input ref={usernameRef} placeholder="username" minLength={5} maxLength={32} isRequired />
          <FormHelperText>5 to 32 symbols</FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            ref={passwordRef}
            placeholder="password"
            minLength={8}
            maxLength={32}
            type="password"
            isRequired
          />
          <FormHelperText>8 to 32 symbols</FormHelperText>
        </FormControl>
        <FormControl isInvalid={!passwordsMatch}>
          <Input
            ref={confirmRef}
            placeholder="confirm password"
            type="password"
            isRequired
            onChange={onConfirmPasswordChanged}
          />
          <FormErrorMessage>Passwords don't match</FormErrorMessage>
        </FormControl>
        <Captcha onChange={setCaptcha} />
        <FormControl isInvalid={isCreateError || isLoginError}>
          <FormErrorMessage justifyContent="center">{errorMessage}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal">
          create account
        </Button>
        <Divider padding={2} />
        <HStack>
          <Text>rember account?</Text>
          <Button onClick={() => navigate(logInUrl)}>back</Button>
        </HStack>
      </VStack>
    </Form>
  );
};

export default LoginForm;
