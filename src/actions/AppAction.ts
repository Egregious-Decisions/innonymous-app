import { ActionFunctionArgs, useActionData } from 'react-router-dom';

export interface AppActionResult {
  ok: boolean;
  error?: string;
}

export type AppActionFunction = (arg: ActionFunctionArgs) => Promise<Response | AppActionResult>;

export const useAppActionData = () => useActionData() as AppActionResult | undefined;

export const aliasInputName = 'alias';
export const passwordInputName = 'password';
export const captchaTokenInputName = 'captcha-id';
export const captchaSolutionInputName = 'captcha-secret';
