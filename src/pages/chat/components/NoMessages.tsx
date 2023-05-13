import { Card, CardBody, Image, Text } from '@chakra-ui/react';
import Meme from './chat_end.jpg';

const NoMessages = ({ caption }: { caption: string }) => (
  <Card maxWidth="15em" overflow="clip">
    <Image src={Meme} />
    <CardBody paddingX="2" paddingY="1">
      <Text as="i">{caption}</Text>
    </CardBody>
  </Card>
);

export default NoMessages;
