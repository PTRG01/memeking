import FollowersSearch from '../../components/followers-search/followers-search';
import FollowingList from '../../components/following-list/following-list';
import AuthLoader from '../../components/auth-loader/auth-loader';
import Chat from '../../components/chat/chat';
import { Group } from '@mantine/core';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import ChatList from '../../components/chat-list/chat-list';
import { ChatProvider } from '../../contexts/chat-provider/chat-provider';
/* eslint-disable-next-line */
export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  const { isLoggedIn } = useAuthContext();

  return (
    <div>
      <AuthLoader>
        {/* <Group position="apart">
          {isLoggedIn && <FollowersSearch />}
          {isLoggedIn && <FollowingList />}
        </Group> */}
      </AuthLoader>
    </div>
  );
}

export default Sidebar;
