import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
  Text,
  IconButton,
  Icon,
  Divider,
  VStack,
  Box,
} from '@chakra-ui/react';
import { MdInfo } from 'react-icons/md';
import { Chat } from '../../../store/models';

const ChatInfoButton = ({ chat }: { chat: Chat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton aria-label="Show chat info" onClick={onOpen} icon={<Icon as={MdInfo} />}>
        Open Modal
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{chat.name || `@${chat.alias}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" divider={<Divider />}>
              <Box>
                <Heading size="md">Link</Heading>
                <Text>
                  {window.location.origin}/{chat.alias}
                </Text>
              </Box>
              <Box>
                <Heading size="md">About</Heading>
                {chat.about ? <Text>{chat.about}</Text> : <Text color="gray">[empty]</Text>}
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatInfoButton;
