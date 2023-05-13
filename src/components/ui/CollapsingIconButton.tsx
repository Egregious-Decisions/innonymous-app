/* eslint-disable react/jsx-props-no-spreading */
import { Button, ButtonProps, Hide, IconButton, IconButtonProps, Show } from '@chakra-ui/react';

const CollapsingIconButton = ({
  children,
  leftIcon,
  rightIcon,
  breakpoint,
  ...props
}: ButtonProps & Omit<IconButtonProps, 'icon'> & { breakpoint: string }) => (
  <>
    <Hide breakpoint={breakpoint}>
      <Button {...props} {...{ leftIcon, rightIcon }}>
        {children}
      </Button>
    </Hide>
    <Show breakpoint={breakpoint}>
      <IconButton {...props} icon={leftIcon ?? rightIcon} />
    </Show>
  </>
);

export default CollapsingIconButton;
