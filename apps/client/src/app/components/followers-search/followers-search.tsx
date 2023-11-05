import { NavLink } from '@mantine/core';
import { useState } from 'react';
import UserSearch from '../user-search/user-search';
import { User } from 'tabler-icons-react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import UserList from '../user-list/user-list';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import UserListItemInline from '../user-list-item-inline/user-list-item-inline';

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
          listItem={(item, values) => (
            <UserListItemInline
              user={item}
              values={values}
              onAddUser={handleAddUser}
              onRemoveUser={handleRemoveUser}
              handleItemClick={() => ''}
              itemActive={false}
              isLoading={isLoading}
            />
          )}
          userList={followersSearchList}
          currentList={followingList}
          isLoading={isLoading}
          hideExisting={false}
        />
      </UserSearch>
    </NavLink>
  );
}

export default FollowersSearch;
