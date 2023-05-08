import {
  Text,
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
      <Button variant="link" color="gray.400" onClick={onOpen}>
        forgor💀 password?
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>forgor💀 password?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text marginBottom={5}>
              It is all your fault. Imagine it was a bitcoin wallet instead, what would you do?
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
