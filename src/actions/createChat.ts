import { redirect } from 'react-router-dom';
import { apiSlice, getErrorMessage } from '../store/apiSlice';
import { store } from '../store/store';
import { CaptchaSolution } from '../store/models';
import {
  AppActionFunction,
  aboutInputName,
  aliasInputName,
  captchaSolutionInputName,
  captchaTokenInputName,
  nameInputName,
} from './AppAction';

const createChat: AppActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const alias = formData.get(aliasInputName);
  const name = formData.get(nameInputName);
  const about = formData.get(aboutInputName);
  const captcha: CaptchaSolution = {
    token: formData.get(captchaTokenInputName) as string,
    secret: formData.get(captchaSolutionInputName) as string,
  };

  if (
    typeof alias !== 'string' ||
    typeof name !== 'string' ||
    typeof about !== 'string' ||
    typeof captcha.token !== 'string' ||
    typeof captcha.secret !== 'string'
  ) {
    return { ok: false, error: 'Form submission error' };
  }

  const result = await store.dispatch(
    apiSlice.endpoints.createChat.initiate({ captcha, info: { alias, name, about } }),
  );

  if ('error' in result) {
    return {
      ok: false,
      error: getErrorMessage(result.error, 'Chat field requirements are not met.'),
    };
  }

  return redirect(`/${alias}`);
};

export default createChat;
