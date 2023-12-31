import { Badge, Group, List, NavLink } from '@mantine/core';
import { useCallback, useState } from 'react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import LoaderComponent from '../loader/loader';
import { useTranslation } from 'react-i18next';
import UserList from '../user-list/user-list';
import UserListItemInline from '../user-list-item-inline/user-list-item-inline';

/* eslint-disable-next-line */

export function FollowingList() {
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
  const { t } = useTranslation();

  const handleItemClick = useCallback(
    (id: string) => {
      //  Function compares chats users ids with current chat users ids, if true it opens matching chat, if not creates new chat with provided user
      const currentUsers = [user?.id, id];
      const matchingChat = userChatsList?.find(
        (chat) =>
          chat?.users?.length === currentUsers.length &&
          chat.users.every((userId) => currentUsers?.includes(userId))
      );
      if (!matchingChat) {
        createChatWithUser(id);
        return;
      }
      const chatExists = matchingChat?.users?.includes(id);
      if (chatExists) handleOpenChatToggle(matchingChat?.id);
    },
    [createChatWithUser, handleOpenChatToggle, user, userChatsList]
  );
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
                listItem={(item, values) => (
                  <UserListItemInline
                    user={item}
                    values={values}
                    onAddUser={handleAddFollowing}
                    onRemoveUser={handleRemoveFollowing}
                    onItemClick={handleItemClick}
                    itemActive
                    isLoading={isLoading}
                  />
                )}
                userList={followingList}
                currentList={followingList}
                isLoading={isLoading}
                hideExisting={false}
              />
            </Group>
          </LoaderComponent>
        </List>
      </Group>
    </NavLink>
  );
}

export default FollowingList;
