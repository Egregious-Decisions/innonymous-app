import { useRef, useState } from 'react';
import { Form, useSearchParams } from 'react-router-dom';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import {
  aboutInputName,
  aliasInputName,
  nameInputName,
  useAppActionData,
} from '../../../../actions/AppAction';
import Captcha from '../../../../components/Captcha';

const CreateChat = () => {
  const aliasRef = useRef<HTMLInputElement>(null);
  const [_, setParams] = useSearchParams();
  const [chatAlias, setChatAlias] = useState<string | undefined>('');
  const result = useAppActionData();

  return (
    <Card maxWidth="md" alignSelf="center">
      <CardBody>
        <Form method="POST">
          <VStack>
            <FormControl>
              <Input
                name={aliasInputName}
                ref={aliasRef}
                placeholder="chat_link"
                minLength={5}
                maxLength={32}
                onChange={() => setChatAlias(aliasRef.current?.value)}
                isRequired
              />
              <FormHelperText>required, 5 to 32 symbols</FormHelperText>
              <FormHelperText>
                Preview: {window.location.origin}/{chatAlias}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <Input name={nameInputName} placeholder="chat name" />
              <FormHelperText>optional, up to 64 symbols</FormHelperText>
            </FormControl>
            <FormControl>
              <Input name={aboutInputName} placeholder="about" />
              <FormHelperText>optional, up to 128 symbols</FormHelperText>
            </FormControl>
            <Captcha />
            <FormControl isInvalid={!result?.ok}>
              <FormErrorMessage justifyContent="center">{result?.error}</FormErrorMessage>
            </FormControl>
            <Alert status="info">
              <AlertIcon />
              <AlertDescription>
                You will not be able to edit this information later.
              </AlertDescription>
            </Alert>
            <HStack>
              <Button type="submit" colorScheme="teal">
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
