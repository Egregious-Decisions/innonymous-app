import { Link, SkeletonText } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import { apiSlice } from '../../../../../../store/apiSlice';
import { Id } from '../../../../../../store/models';
import ErrorFragment from '../ErrorFragment';

const UserMention = ({ user }: { user: Id }) => {
  const { data, isLoading, isError } = apiSlice.useGetUserQuery({ user });

  if (isError) {
    return <ErrorFragment>@[user not found]</ErrorFragment>;
  }

  if (isLoading) {
    return <SkeletonText>@username</SkeletonText>;
  }

  return (
    <Link as={RouteLink} to={`/${data?.alias}`}>
      @{data?.alias}
    </Link>
  );
};

export default UserMention;
