import { Badge, Group, List, NavLink } from '@mantine/core';
import { useState } from 'react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import UserListItem from '../user-list-item/user-list-item';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import LoaderComponent from '../loader/loader';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface IFollowingListProps {}

export function FollowingList(props: IFollowingListProps) {
  const [active, setActive] = useState(false);
  const { user, updateCurrentUser } = useAuthContext();
  const { loading, followersList } = useChatContext();
  const { t, i18n } = useTranslation();

  return (
    <NavLink
      label={t('following.following')}
      childrenOffset={0}
      active={active}
      variant="filled"
      icon={
        <Badge size="xs" variant="filled" color="blue" w={16} h={16} p={0}>
          {user?.followers.length}
        </Badge>
      }
      onClick={() => setActive(!active)}
    >
      <Group>
        <List mt="lg" size="sm" w="100%">
          <LoaderComponent isLoading={loading}>
            {followersList?.map((record: IUser) => (
              <UserListItem
                label={record.name}
                avatar={record.avatar}
                id={record.id}
                key={record.id}
                values={user.followers}
                card={false}
                onAddValue={function () {
                  throw new Error('Function not implemented.');
                }}
                onRemoveValue={function () {
                  updateCurrentUser({
                    followers: user.followers.filter(
                      (follower: string) => follower !== record.id
                    ),
                  });
                }}
                loading={false}
                addUser={false}
              />
            ))}
          </LoaderComponent>
        </List>
      </Group>
    </NavLink>
  );
}

export default FollowingList;
