import { IconButton, Icon } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAppLocationState } from '../../hooks';

const GoBackButton = () => {
  const state = useAppLocationState();
  const navigate = useNavigate();

  return (
    <IconButton
      aria-label="Go back"
      icon={<Icon as={BiArrowBack} />}
      onClick={() => (state?.canGoBack ? navigate(-1) : navigate('/'))}
    />
  );
};

export default GoBackButton;
