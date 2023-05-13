import { AppActionFunction, aliasInputName, passwordInputName } from './AppAction';
import { apiSlice, getErrorMessage } from '../store/apiSlice';
import { store } from '../store/store';
import { authLogin } from '../store/actions';

const logIn: AppActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const alias = formData.get(aliasInputName);
  const password = formData.get(passwordInputName);

  if (typeof alias !== 'string' || typeof password !== 'string') {
    return { ok: false, error: 'Form submission error' };
  }

  const result = await store.dispatch(
    apiSlice.endpoints.createSession.initiate({ alias, password }),
  );

  if ('error' in result) {
    return { ok: false, error: getErrorMessage(result.error, 'Invalid username or password.') };
  }

  store.dispatch(authLogin(result.data));

  return { ok: true };
};

export default logIn;
