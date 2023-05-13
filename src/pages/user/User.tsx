import { Card, CardBody, CardHeader, Center, Flex, Heading, Text } from '@chakra-ui/react';
import Header from '../../components/layout/Header';
import HeaderName from '../../components/ui/HeaderName';
import { UserInfo } from '../../store/models';
import GoBackButton from '../../components/ui/GoBackButton';

const User = ({ user }: { user: UserInfo }) => (
  <Flex height="100%" direction="column" alignItems="stretch">
    <Header>
      <GoBackButton />
      <HeaderName name={user.name} alias={user.alias} />
    </Header>
    <Center padding="2">
      <Card maxWidth="md">
        <CardHeader>
          <Heading size="md">About</Heading>
        </CardHeader>
        <CardBody paddingTop="0">
          {user.about ? <Text>{user.about}</Text> : <Text color="gray">[empty]</Text>}
        </CardBody>
      </Card>
    </Center>
  </Flex>
);

export default User;
