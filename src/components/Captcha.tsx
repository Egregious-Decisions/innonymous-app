import { ChangeEvent, useCallback } from 'react';
import { Center, HStack, Icon, IconButton, Image, Input, Spinner, VStack } from '@chakra-ui/react';
import { apiSlice } from '../store/apiSlice';
import { CaptchaSolution } from '../store/models';
import { MdRefresh } from 'react-icons/md';
import { useEffectOnce } from 'usehooks-ts';

const Captcha = ({ onChange }: { onChange: (solution: CaptchaSolution) => void }) => {
  const [fetch, { data, isFetching }] = apiSlice.useLazyGetCaptchaQuery();

  const loadCaptcha = useCallback(() => fetch(undefined, false), [fetch]);

  useEffectOnce(() => {
    loadCaptcha();
  });

  const onInputChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (data === undefined) {
        return;
      }

      onChange({ token: data.token, secret: value });
    },
    [data, onChange],
  );

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
      <Input onChange={onInputChange} placeholder="symbols from picture" isRequired />
    </VStack>
  );
};

export default Captcha;
