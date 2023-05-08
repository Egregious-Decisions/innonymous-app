import { apiSlice, getErrorMessage } from '../store/apiSlice';
import { store } from '../store/store';
import { CaptchaSolution } from '../store/models';
import {
  AppActionFunction,
  aliasInputName,
  captchaSolutionInputName,
  captchaTokenInputName,
  passwordInputName,
} from './AppAction';

const createAccount: AppActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const alias = formData.get(aliasInputName);
  const password = formData.get(passwordInputName);
  const captcha: CaptchaSolution = {
    token: formData.get(captchaTokenInputName) as string,
    secret: formData.get(captchaSolutionInputName) as string,
  };

  if (
    typeof alias !== 'string' ||
    typeof password !== 'string' ||
    typeof captcha.token !== 'string' ||
    typeof captcha.secret !== 'string'
  ) {
    return { ok: false, error: 'Form submission error' };
  }

  const result = await store.dispatch(
    apiSlice.endpoints.createUser.initiate({ captcha, credentials: { alias, password } }),
  );

  if ('error' in result) {
    return {
      ok: false,
      error: getErrorMessage(result.error, 'Password or username requirements not met.'),
    };
  }

  return { ok: true };
};

export default createAccount;
