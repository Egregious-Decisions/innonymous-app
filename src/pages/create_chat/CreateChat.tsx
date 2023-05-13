import { useRef, useState, useCallback } from 'react';
import { Form, Navigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  HStack,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react';
import Captcha from '../../components/form/Captcha';
import AutosizeTextarea from '../../components/ui/AutosizeTextarea';
import { apiSlice } from '../../store/apiSlice';
import FormError from '../../components/form/FormError';
import { CaptchaSolution } from '../../store/models';

const CreateChat = () => {
  const aliasRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const [_, setParams] = useSearchParams();
  const [chatAlias, setChatAlias] = useState<string>('');
  const [captcha, setCaptcha] = useState<CaptchaSolution>();

  const [createChat, { isError, error, isLoading, isSuccess }] = apiSlice.useCreateChatMutation();

  const onCreate = useCallback(async () => {
    if (!captcha || !aliasRef.current || !nameRef.current || !aboutRef.current) {
      return;
    }

    await createChat({
      info: {
        alias: aliasRef.current.value,
        name: nameRef.current.value,
        about: aboutRef.current.value,
      },
      captcha,
    });
  }, [captcha, createChat]);

  if (isSuccess) {
    return <Navigate to={chatAlias} />;
  }

  return (
    <Card maxWidth="sm" alignSelf="center">
      <CardBody>
        <Form method="POST">
          <VStack>
            <FormControl>
              <Input
                ref={aliasRef}
                placeholder="chat_link"
                minLength={5}
                maxLength={32}
                onChange={() => setChatAlias(aliasRef.current?.value || '')}
                isRequired
              />
              <FormHelperText>required, 5 to 32 symbols</FormHelperText>
              <FormHelperText>
                Preview: {window.location.origin}/{chatAlias}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <Input ref={nameRef} placeholder="chat name" maxLength={64} />
              <FormHelperText>optional, up to 64 symbols</FormHelperText>
            </FormControl>
            <FormControl>
              <AutosizeTextarea ref={aboutRef} placeholder="about" maxLength={128} />
              <FormHelperText>optional, up to 128 symbols</FormHelperText>
            </FormControl>
            <Captcha onChanged={setCaptcha} />
            <FormError
              validationError="Chat field requirements are not met."
              {...{ isError, error }}
            />
            <Alert status="info">
              <AlertIcon />
              <AlertDescription>
                <Text>Chat info can&#39;t be edited later.</Text>
                <Text>Chat can&#39;t be deleted manually.</Text>
              </AlertDescription>
            </Alert>
            <HStack>
              <Button onClick={onCreate} isLoading={isLoading} colorScheme="teal">
                create chat
              </Button>
              <Button onClick={() => setParams('')}>cancel</Button>
            </HStack>
          </VStack>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateChat;
