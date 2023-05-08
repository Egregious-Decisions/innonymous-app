import { useRef, useCallback, useState, useEffect } from 'react';
import { Form, useNavigate, useSubmit } from 'react-router-dom';
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
import Captcha from '../../../components/Captcha';
import { aliasInputName, passwordInputName, useAppActionData } from '../../../actions/AppAction';

const NewAccountForm = ({
  loginUrl,
  loginActionUrl,
}: {
  loginUrl: string;
  loginActionUrl: string;
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const result = useAppActionData();
  const navigate = useNavigate();
  const submit = useSubmit();

  const onPasswordChanged = useCallback(() => {
    setPasswordsMatch(
      confirmRef.current?.value === '' || passwordRef.current?.value === confirmRef.current?.value,
    );
  }, []);

  useEffect(() => {
    if (result?.ok) {
      submit(document.forms[0], { method: 'POST', action: loginActionUrl });
    }
  }, [loginActionUrl, result, submit]);

  return (
    <Form method="POST">
      <VStack>
        <FormControl>
          <Input
            name={aliasInputName}
            ref={usernameRef}
            placeholder="username"
            minLength={5}
            maxLength={32}
            isRequired
          />
          <FormHelperText>5 to 32 symbols</FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            name={passwordInputName}
            ref={passwordRef}
            placeholder="password"
            minLength={8}
            maxLength={32}
            type="password"
            onChange={onPasswordChanged}
            isRequired
          />
          <FormHelperText>8 to 32 symbols</FormHelperText>
        </FormControl>
        <FormControl isInvalid={!passwordsMatch}>
          <Input
            ref={confirmRef}
            placeholder="confirm password"
            type="password"
            onChange={onPasswordChanged}
            isRequired
          />
          <FormErrorMessage>Passwords don't match</FormErrorMessage>
        </FormControl>
        <Captcha />
        <FormControl isInvalid={!result?.ok}>
          <FormErrorMessage justifyContent="center">{result?.error}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal">
          create account
        </Button>
        <Divider padding={2} />
        <HStack>
          <Text>rember account?</Text>
          <Button onClick={() => navigate(loginUrl)}>back</Button>
        </HStack>
      </VStack>
    </Form>
  );
};

export default NewAccountForm;
