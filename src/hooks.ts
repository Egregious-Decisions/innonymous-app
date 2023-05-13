import { useLocation, useParams } from 'react-router-dom';

export const appRouteParams = ['alias', 'message'] as const;
export type AppRouteParamKey = (typeof appRouteParams)[number];

export type AppLocationState = { canGoBack?: boolean };

export const useAppRouteParams = useParams<AppRouteParamKey>;
export const useAppLocationState = () => useLocation().state as AppLocationState | null;
