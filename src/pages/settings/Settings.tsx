import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import UserInfoSettings from './components/UserInfoSettings';
import PasswordSettings from './components/PasswordSettings';

const Settings = () => (
  <Tabs display="flex" flexDirection="column" flex="1" minHeight="0">
    <TabList>
      <Tab>
        <Heading size="md">user info</Heading>
      </Tab>
      <Tab>
        <Heading size="md">password</Heading>
      </Tab>
      <Tab isDisabled>
        <Heading size="md">sessions</Heading>
      </Tab>
    </TabList>
    <TabPanels overflowY="scroll" flex="1">
      <TabPanel>
        <UserInfoSettings />
      </TabPanel>
      <TabPanel>
        <PasswordSettings />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default Settings;
