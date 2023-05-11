import { useParams } from 'react-router-dom';

export const appRouteParams = ['alias', 'message'] as const;
export type AppRouteParamKey = (typeof appRouteParams)[number];

export const useAppRouteParams = useParams<AppRouteParamKey>;
