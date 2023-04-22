import { Badge, Group, List, NavLink } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useUserList } from '../../hooks/pb-utils';
import {
  IUser,
  useAuthContext,
} from '../../contexts/auth-provider/auth-provider';
import UserListItem from '../user-list-item/user-list-item';
import { useUser } from '../../hooks/pb-utils';
/* eslint-disable-next-line */
export interface IFollowingListProps {}

export function FollowingList(props: IFollowingListProps) {
  const [active, setActive] = useState(false);
  const { user, updateCurrentUser } = useAuthContext();
  const { getOne, data } = useUser(user?.id);

  useEffect(() => {
    console.log(user?.id);
    getOne({ expand: 'followers' });
  }, [user?.id]);

  return (
    <Group>
      <NavLink
        label={'Following'}
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
        <List mt="lg" size="sm" w="100%">
          {data
            ? data.expand.followers.map((item: IUser) => (
                <UserListItem
                  label={item.name}
                  avatar={item.avatar}
                  id={item.id}
                  key={item.id}
                  values={user?.followers}
                  onAddValue={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  onRemoveValue={function (): void {
                    updateCurrentUser({
                      followers: user?.followers.filter(
                        (follower: string) => follower !== item.id
                      ),
                    });
                  }}
                  loading={false}
                />
              ))
            : null}
        </List>
      </NavLink>
    </Group>
  );
}

export default FollowingList;
