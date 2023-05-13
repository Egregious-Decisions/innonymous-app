import { useCallback, useRef } from 'react';
import { Center, HStack, Icon, IconButton, Image, Input, Spinner, VStack } from '@chakra-ui/react';
import { MdRefresh } from 'react-icons/md';
import { useEffectOnce } from 'usehooks-ts';
import { captchaSolutionInputName, captchaTokenInputName } from '../../actions/AppAction';
import { apiSlice } from '../../store/apiSlice';
import { CaptchaSolution } from '../../store/models';

const Captcha = ({ onChanged }: { onChanged?: (solution: CaptchaSolution) => void }) => {
  const secretRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);

  const [fetch, { data, isFetching }] = apiSlice.useLazyGetCaptchaQuery();

  const loadCaptcha = useCallback(() => fetch(undefined, false), [fetch]);

  useEffectOnce(() => {
    loadCaptcha();
  });

  const onSecretChanged = useCallback(() => {
    if (!onChanged || !secretRef.current || !tokenRef.current) {
      return;
    }
    onChanged({ secret: secretRef.current.value, token: tokenRef.current.value });
  }, [onChanged]);

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
      <Input
        ref={secretRef}
        onChange={onSecretChanged}
        name={captchaSolutionInputName}
        placeholder="symbols from picture"
        isRequired
      />
      <Input ref={tokenRef} name={captchaTokenInputName} type="hidden" defaultValue={data?.token} />
    </VStack>
  );
};

export default Captcha;
