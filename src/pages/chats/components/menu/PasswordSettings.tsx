import {
  Card,
  CardBody,
  VStack,
  Input,
  Button,
  useToast,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import FormError from '../../../../components/FormError';
import { apiSlice } from '../../../../store/apiSlice';

const PasswordSettings = () => {
  const oldRef = useRef<HTMLInputElement>(null);
  const newRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [updateUser, { isError, error, isLoading, isSuccess }] =
    apiSlice.useUpdateCurrentUserMutation();

  const onPasswordChanged = useCallback(() => {
    setPasswordsMatch(
      confirmRef.current?.value === '' || newRef.current?.value === confirmRef.current?.value,
    );
  }, []);

  const toast = useToast();

  const onSave = useCallback(async () => {
    if (oldRef.current === null || newRef.current === null) {
      return;
    }

    await updateUser({
      password: { new: newRef.current.value, old: oldRef.current.value },
    });
  }, [updateUser]);

  useEffect(() => {
    if (isSuccess) {
      toast({ description: 'Password updated successfully.' });
    }
  }, [toast, isSuccess]);

  return (
    <Card maxWidth="md" margin="auto">
      <CardBody>
        <VStack>
          <Input ref={oldRef} placeholder="old" type="password" isRequired />

          <FormControl>
            <Input
              ref={newRef}
              placeholder="new"
              type="password"
              onChange={onPasswordChanged}
              isRequired
            />
            <FormHelperText>8 to 32 symbols</FormHelperText>
          </FormControl>
          <FormControl isInvalid={!passwordsMatch}>
            <Input
              ref={confirmRef}
              placeholder="confirm"
              type="password"
              onChange={onPasswordChanged}
              isRequired
            />
            <FormErrorMessage>Passwords don&#39;t match</FormErrorMessage>
          </FormControl>
          <FormError validationError="Password requirements not met." {...{ isError, error }} />
          <Button onClick={onSave} colorScheme="teal" isLoading={isLoading}>
            save
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default PasswordSettings;
