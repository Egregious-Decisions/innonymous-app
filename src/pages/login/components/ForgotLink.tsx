import {
  Text,
  Link,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
} from '@chakra-ui/react';
import ForgotImage from './forgor.jpg';

const ForgotLink = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Link color="gray.400" onClick={onOpen}>
        forgor💀 password?
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>forgor💀 password?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text marginBottom={5}>
              It's all your fault. Imagine it was a bitcoin wallet instead, what would you do?
            </Text>
            <Image src={`${ForgotImage}`} borderRadius="lg" alt="funny meme" />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgotLink;
