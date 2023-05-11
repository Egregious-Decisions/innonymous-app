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
  FormLabel,
  HStack,
} from '@chakra-ui/react';
import { useRef, ChangeEvent, ReactNode, useMemo } from 'react';
import LightThemeImage from './switch_theme.jpg';

const DarkThemeSwitch = ({ id, label }: { id?: string; label?: ReactNode }) => {
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

  const switchId = useMemo(() => id ?? 'dark-mode-switch', [id]);

  return (
    <>
      <HStack>
        <FormLabel htmlFor={switchId} mb="0">
          {label ?? 'dark mode'}
        </FormLabel>
        <Switch id={switchId} isChecked={colorMode === 'dark'} onChange={onChange} />
      </HStack>

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
