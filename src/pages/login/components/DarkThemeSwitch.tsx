import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useColorMode,
  Switch,
  LightMode,
  Image,
  Text,
} from '@chakra-ui/react';
import { useRef, ChangeEvent } from 'react';
import LightThemeImage from './switch_theme.jpg';

const DarkThemeSwitch = ({ id }: { id: string }) => {
  const { isOpen, onOpen: onOpenDialog, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      toggleColorMode();
      return;
    }
    onOpenDialog();
  };

  return (
    <>
      <Switch id={id} isChecked={colorMode === 'dark'} onChange={onChange} />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              switch to light theme
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text marginBottom={5}>are you sure?</Text>
              <Image src={`${LightThemeImage}`} borderRadius="lg" alt="funny meme" />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                cancel
              </Button>
              <LightMode>
                <Button
                  onClick={() => {
                    toggleColorMode();
                    onClose();
                  }}
                  marginLeft={3}
                  color="black"
                >
                  switch theme
                </Button>
              </LightMode>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DarkThemeSwitch;
