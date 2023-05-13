/* eslint-disable react/jsx-props-no-spreading */
import { Link, LinkProps } from 'react-router-dom';
import { AppLocationState } from '../../hooks';

const AppRouteLink = ({ state, ...props }: LinkProps) => {
  const goBack: AppLocationState = { canGoBack: true };
  return <Link state={{ ...goBack, ...state }} {...props} />;
};

export default AppRouteLink;
