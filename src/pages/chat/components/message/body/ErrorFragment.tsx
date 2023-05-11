import { ReactNode } from 'react';

const ErrorFragment = ({ children }: { children: ReactNode }) => (
  <span color="gray">{children}</span>
);

export default ErrorFragment;
