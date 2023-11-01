import { Badge, Group, List, NavLink } from '@mantine/core';
import { useState } from 'react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import LoaderComponent from '../loader/loader';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import UserList from '../user-list/user-list';

/* eslint-disable-next-line */
export interface IFollowingListProps {}

export function FollowingList(props: IFollowingListProps) {
  const [active, setActive] = useState(false);
  const { user } = useAuthContext();
  const {
    isLoading,
    followingList,
    handleAddFollowing,
    handleRemoveFollowing,
    userChatsList,
    createChatWithUser,
    handleOpenChatToggle,
  } = useChatContext();
  const { t, i18n } = useTranslation();

  // TODO VERIFY HANDLE FUNCTION

  function handleItemClick(id: string) {
    if (!id) return;
    const currentUsers = [user?.id, id];
    const matchingChat = userChatsList?.find(
      (chat) =>
        chat?.users?.length === currentUsers.length &&
        chat.users.every((userId) => currentUsers?.includes(userId))
    );
    if (!matchingChat) return;

    const chatExists = matchingChat?.users?.includes(id);
    if (chatExists) {
      handleOpenChatToggle(matchingChat?.id);
    } else {
      createChatWithUser(id);
    }
  }
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
          <LoaderComponent isLoading={isLoading}>
            <Group>
              <UserList
                userList={followingList}
                onAddUser={handleAddFollowing}
                onRemoveUser={handleRemoveFollowing}
                currentList={followingList}
                isLoading={isLoading}
                itemActive={true}
                handleItemClick={handleItemClick}
                hideExisting={false}
                card={false}
              />
            </Group>
          </LoaderComponent>
        </List>
      </Group>
    </NavLink>
  );
}

export default FollowingList;
