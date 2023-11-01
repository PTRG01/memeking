import { Group, NavLink } from '@mantine/core';
import { useUserList } from '../../hooks/pb-utils';
import { useState } from 'react';
import UserSearch from '../user-search/user-search';
import { User } from 'tabler-icons-react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import UserList from '../user-list/user-list';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';

/* eslint-disable-next-line */

export function FollowersSearch() {
  const { user, updateCurrentUser, isLoading } = useAuthContext();
  const { handleSearch, followersSearchList, followingList } = useChatContext();
  const [active, setActive] = useState(false);
  const { t, i18n } = useTranslation();

  if (!user) return null;

  const handleAddUser = (id: string): void => {
    updateCurrentUser({
      followers: [...user.followers, id],
    });
  };
  const handleRemoveUser = (id: string): Promise<void> =>
    updateCurrentUser({
      followers: user.followers.filter((follower: string) => follower !== id),
    });
  return (
    <NavLink
      label={t('search.search')}
      childrenOffset={0}
      active={active}
      variant="filled"
      icon={<User />}
      onClick={() => setActive(!active)}
    >
      <UserSearch handleSearch={handleSearch} loading={isLoading}>
        <UserList
          userList={followersSearchList}
          onAddUser={handleAddUser}
          onRemoveUser={handleRemoveUser}
          currentList={followingList}
          handleItemClick={() => ''}
          isLoading={isLoading}
          itemActive={false}
          hideExisting={false}
        />
      </UserSearch>
    </NavLink>
  );
}

export default FollowersSearch;
