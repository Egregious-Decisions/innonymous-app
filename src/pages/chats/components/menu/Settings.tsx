import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { Form } from 'react-router-dom';
import {
  aliasInputName,
  nameInputName,
  aboutInputName,
  useAppActionData,
  oldPasswordInputName,
  passwordInputName,
} from '../../../../actions/AppAction';
import { apiSlice } from '../../../../store/apiSlice';

const Settings = () => {
  const { data } = apiSlice.useGetCurrentUserQuery();
  const result = useAppActionData();

  return (
    <Tabs minHeight="0" overflowY="scroll">
      <TabList>
        <Tab>
          <Heading size="md">user info</Heading>
        </Tab>
        <Tab>
          <Heading size="md">password</Heading>
        </Tab>
        <Tab>
          <Heading size="md">sessions</Heading>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Form method="POST">
            <Card maxWidth="md" margin="auto">
              <CardBody>
                <VStack>
                  <FormControl>
                    <Input
                      name={aliasInputName}
                      placeholder="username"
                      minLength={5}
                      maxLength={32}
                      defaultValue={data?.alias}
                      isRequired
                    />
                    <FormHelperText>required, 5 to 32 symbols</FormHelperText>
                  </FormControl>
                  <FormControl>
                    <Input
                      name={nameInputName}
                      placeholder="display name"
                      defaultValue={data?.name}
                    />
                    <FormHelperText>optional, up to 64 symbols</FormHelperText>
                  </FormControl>
                  <FormControl>
                    <Input name={aboutInputName} placeholder="about" defaultValue={data?.about} />
                    <FormHelperText>optional, up to 128 symbols</FormHelperText>
                  </FormControl>
                  <FormControl isInvalid={!result?.ok}>
                    <FormErrorMessage justifyContent="center">{result?.error}</FormErrorMessage>
                  </FormControl>
                  <HStack>
                    <Button type="submit" colorScheme="teal">
                      save
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </Form>
        </TabPanel>
        <TabPanel>
          <Form method="POST">
            <Card maxWidth="md" margin="auto">
              <CardBody>
                <VStack>
                  <Input name={oldPasswordInputName} placeholder="old" type="password" isRequired />
                  <Input name={passwordInputName} placeholder="new" type="password" isRequired />
                  <FormControl isInvalid={!result?.ok}>
                    <FormErrorMessage justifyContent="center">{result?.error}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="teal">
                    save
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </Form>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Settings;
