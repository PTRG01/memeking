import { Group, NavLink } from '@mantine/core';
import { useUserList } from '../../hooks/pb-utils';
import { useState } from 'react';
import UserSearch from '../search/user-search';
import { User } from 'tabler-icons-react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { TUserModel } from '../../contexts/auth-provider/auth-provider.interface';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */

export function FollowersSearch() {
  const { user, updateCurrentUser, isLoading } = useAuthContext();
  const [active, setActive] = useState(false);
  const { t, i18n } = useTranslation();

  // const filterQueryResult = (currentUser: TUserModel) => {
  //   return result?.filter((user) => user.id !== currentUser?.id);
  // };

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
      <UserSearch
        onAddUser={handleAddUser}
        onRemoveUser={handleRemoveUser}
        values={user?.followers}
        loading={isLoading}
        hideExisting={false}
      />
    </NavLink>
  );
}

export default FollowersSearch;
