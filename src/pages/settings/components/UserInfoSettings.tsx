import {
  Card,
  CardBody,
  VStack,
  FormControl,
  Input,
  FormHelperText,
  Button,
  useToast,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useCallback } from 'react';
import FormError from '../../../components/form/FormError';
import { apiSlice } from '../../../store/apiSlice';
import AutosizeTextarea from '../../../components/ui/AutosizeTextarea';

const UserInfoSettings = () => {
  const aliasRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const { data } = apiSlice.useGetCurrentUserQuery();
  const [updateUser, { isError, error, isLoading, isSuccess }] =
    apiSlice.useUpdateCurrentUserMutation();

  const toast = useToast();

  const onSave = useCallback(async () => {
    if (aliasRef.current === null || nameRef.current === null || aboutRef.current === null) {
      return;
    }

    await updateUser({
      alias: aliasRef.current.value,
      about: aboutRef.current.value,
      name: nameRef.current.value,
    });
  }, [updateUser]);

  useEffect(() => {
    if (isSuccess) {
      toast({ description: 'User info saved.' });
    }
  }, [toast, isSuccess]);

  return (
    <VStack>
      <Card minWidth="sm">
        <CardBody>
          <FormControl>
            <FormLabel>Username (alias)</FormLabel>
            <Input
              ref={aliasRef}
              placeholder="username"
              minLength={5}
              maxLength={32}
              pattern="[a-zA-Z0-9]\w{3,30}[a-zA-Z0-9]"
              defaultValue={data?.alias}
              isRequired
            />
            <FormHelperText>
              <Text>required, 5 to 32 symbols</Text>
              <Text>must start and end with a letter or digit</Text>
            </FormHelperText>
          </FormControl>
        </CardBody>
      </Card>

      <Card minWidth="sm">
        <CardBody>
          <FormControl>
            <FormLabel>Display name</FormLabel>
            <Input
              ref={nameRef}
              placeholder="display name"
              maxLength={64}
              defaultValue={data?.name}
            />
            <FormHelperText>optional, up to 64 symbols</FormHelperText>
          </FormControl>
        </CardBody>
      </Card>
      <Card minWidth="sm">
        <CardBody>
          <FormControl>
            <FormLabel>About</FormLabel>
            <AutosizeTextarea
              ref={aboutRef}
              placeholder="about"
              maxLength={128}
              defaultValue={data?.about}
            />
            <FormHelperText>optional, up to 128 symbols</FormHelperText>
          </FormControl>
        </CardBody>
      </Card>
      <FormError validationError="Invalid alias or description" {...{ isError, error }} />
      <Button onClick={onSave} colorScheme="teal" isLoading={isLoading}>
        save
      </Button>
    </VStack>
  );
};

export default UserInfoSettings;
