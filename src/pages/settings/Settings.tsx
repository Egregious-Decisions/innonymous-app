import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import UserInfoSettings from './components/UserInfoSettings';
import PasswordSettings from './components/PasswordSettings';
import AppSettings from './components/AppSettings';

const Settings = () => (
  <Tabs display="flex" flexDirection="column" flex="1" minHeight="0">
    <TabList whiteSpace="nowrap" overflowX="auto" overflowY="hidden" width="0" minWidth="100%">
      <Tab>
        <Heading size="md">app</Heading>
      </Tab>
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
        <AppSettings />
      </TabPanel>
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
