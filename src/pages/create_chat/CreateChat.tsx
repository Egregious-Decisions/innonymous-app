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
  Text,
} from '@chakra-ui/react';
import {
  aboutInputName,
  aliasInputName,
  nameInputName,
  useAppActionData,
} from '../../actions/AppAction';
import Captcha from '../../components/form/Captcha';
import AutosizeTextarea from '../../components/ui/AutosizeTextarea';

const CreateChat = () => {
  const aliasRef = useRef<HTMLInputElement>(null);
  const [_, setParams] = useSearchParams();
  const [chatAlias, setChatAlias] = useState<string | undefined>('');
  const result = useAppActionData();

  return (
    <Card maxWidth="sm" alignSelf="center">
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
              <Input name={nameInputName} placeholder="chat name" maxLength={64} />
              <FormHelperText>optional, up to 64 symbols</FormHelperText>
            </FormControl>
            <FormControl>
              <AutosizeTextarea name={aboutInputName} placeholder="about" maxLength={128} />
              <FormHelperText>optional, up to 128 symbols</FormHelperText>
            </FormControl>
            <Captcha />
            <FormControl isInvalid={!result?.ok}>
              <FormErrorMessage justifyContent="center">{result?.error}</FormErrorMessage>
            </FormControl>
            <Alert status="info">
              <AlertIcon />
              <AlertDescription>
                <Text>Chat info can&#39;t be edited later.</Text>
                <Text>Chat can&#39;t be deleted manually.</Text>
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
