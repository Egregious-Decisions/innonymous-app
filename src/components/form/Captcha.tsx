import { useCallback } from 'react';
import { Center, HStack, Icon, IconButton, Image, Input, Spinner, VStack } from '@chakra-ui/react';
import { MdRefresh } from 'react-icons/md';
import { useEffectOnce } from 'usehooks-ts';
import { captchaSolutionInputName, captchaTokenInputName } from '../../actions/AppAction';
import { apiSlice } from '../../store/apiSlice';

const Captcha = () => {
  const [fetch, { data, isFetching }] = apiSlice.useLazyGetCaptchaQuery();

  const loadCaptcha = useCallback(() => fetch(undefined, false), [fetch]);

  useEffectOnce(() => {
    loadCaptcha();
  });

  return (
    <VStack>
      <HStack height="60px">
        {isFetching && (
          <Center width="160px">
            <Spinner />
          </Center>
        )}
        {!isFetching && data && <Image src={data.image} />}
        <IconButton onClick={loadCaptcha} icon={<Icon as={MdRefresh} />} aria-label="New captcha" />
      </HStack>
      <Input name={captchaSolutionInputName} placeholder="symbols from picture" isRequired />
      <Input name={captchaTokenInputName} type="hidden" defaultValue={data?.token} />
    </VStack>
  );
};

export default Captcha;
