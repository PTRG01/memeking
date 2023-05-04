import { Text } from '@mantine/core';
import FollowersSearch from '../../components/followers-search/followers-search';
import FollowingList from '../../components/user-list/following-list';
import AuthLoader from '../../components/auth-loader/auth-loader';
/* eslint-disable-next-line */
export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <div>
      <FollowersSearch />
      <AuthLoader>
        <FollowingList />
      </AuthLoader>
    </div>
  );
}

export default Sidebar;
