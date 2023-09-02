import { Group, NavLink } from '@mantine/core';
import { useUserList } from '../../hooks/pb-utils';
import { useState } from 'react';
import UserSearch from '../search/search';
import { User } from 'tabler-icons-react';
import {
  TUserModel,
  useAuthContext,
} from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */

export function FollowersSearch() {
  const { getList, result } = useUserList();
  const { user, updateCurrentUser, isLoading } = useAuthContext();
  const [active, setActive] = useState(false);
  const { t, i18n } = useTranslation();

  const filterQueryResult = (currentUser: TUserModel) => {
    return result?.filter((user) => user.id !== currentUser?.id);
  };

  if (!user) return null;

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
        onAddUser={(id) => {
          updateCurrentUser({
            followers: [...user.followers, id],
          });
        }}
        onRemoveUser={(id) =>
          updateCurrentUser({
            followers: user.followers.filter(
              (follower: string) => follower !== id
            ),
          })
        }
        values={user?.followers}
        loading={isLoading}
        hideExisting={false}
        onInputUsed={() => null}
      />
    </NavLink>
  );
}

export default FollowersSearch;
