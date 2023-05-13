import { SkeletonText, Link } from '@chakra-ui/react';
import AppRouteLink from '../../../../components/ui/AppLink';
import { UserInfo } from '../../../../store/models';

const MessageAuthor = ({ author }: { author?: UserInfo }) => {
  if (!author) {
    return <SkeletonText noOfLines={1}>Message author</SkeletonText>;
  }
  return (
    <Link as={AppRouteLink} fontWeight="bold" noOfLines={1} to={`/${author.alias}`}>
      {author.name || author.alias}
    </Link>
  );
};

export default MessageAuthor;
