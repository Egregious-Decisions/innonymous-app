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
import { useRef } from 'react';
import ForgotLink from './ForgotLink';
import { Form, useNavigate } from 'react-router-dom';
import { aliasInputName, passwordInputName, useAppActionData } from '../../../actions/AppAction';

const LoginForm = ({ newAccountUrl, actionUrl }: { newAccountUrl: string; actionUrl: string }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const result = useAppActionData();

  return (
    <Form action={actionUrl} method="POST">
      <VStack>
        <Input name={aliasInputName} ref={usernameRef} placeholder="username" isRequired />
        <Input
          name={passwordInputName}
          ref={passwordRef}
          placeholder="password"
          type="password"
          isRequired
        />
        <FormControl isInvalid={!result?.ok}>
          <FormErrorMessage justifyContent="center">{result?.error}</FormErrorMessage>
        </FormControl>
        <HStack>
          <ForgotLink />
          <Button type="submit" colorScheme="teal">
            log in
          </Button>
        </HStack>
        <Divider paddingY={2} />
        <Text>no account yet?</Text>
        <Button onClick={() => navigate(newAccountUrl)}>join the dark side</Button>
      </VStack>
    </Form>
  );
};

export default LoginForm;
