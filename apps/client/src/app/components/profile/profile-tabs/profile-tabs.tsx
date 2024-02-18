import { ScrollArea, SimpleGrid, Tabs, Text } from '@mantine/core';
import PostList from '../../posts/post-list/post-list';
import UserList from '../../user-list/user-list';
import UserListItemCard from '../../user-list-item-card/user-list-item-card';
import { Friends, MessageCircle, Photo, Settings } from 'tabler-icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navigateData } from '../../../utils/navigate';
import { useCallback } from 'react';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import ProfileSettings from '../profile-settings/profile-settings';

export interface ProfileTabsProps {
  user: IUser;
  profilePostsList: IPost[] | null;
  profileFollowingList: IUser[] | null;
  isLoading: boolean;
  isCurrentUser: boolean;
}

export function ProfileTabs({
  user,
  profilePostsList,
  profileFollowingList,
  isLoading,
  isCurrentUser,
}: ProfileTabsProps) {
  const { profileTab } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    handleRemoveFollowing,
    userChatsList,
    createChatWithUser,
    handleOpenChatToggle,
  } = useChatContext();

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
    <Tabs defaultValue="memes" value={profileTab}>
      <Tabs.List>
        <Tabs.Tab
          value="memes"
          icon={<Photo size="0.8rem" />}
          onClick={() => navigate(`${navigateData.profileMemes}/${user?.id}`)}
        >
          {t('profile.memes')}
        </Tabs.Tab>

        <Tabs.Tab
          value="posts"
          icon={<MessageCircle size="0.8rem" />}
          onClick={() => navigate(`${navigateData.profilePosts}/${user?.id}`)}
        >
          {t('profile.posts')}
        </Tabs.Tab>
        <Tabs.Tab
          value="following"
          icon={<Friends size="0.8rem" />}
          onClick={() =>
            navigate(`${navigateData.profileFollowing}/${user?.id}`)
          }
        >
          {t('profile.following')}
        </Tabs.Tab>
        {isCurrentUser && (
          <Tabs.Tab
            value="settings"
            icon={<Settings size="0.8rem" />}
            onClick={() =>
              navigate(`${navigateData.profileSettings}/${user?.id}`)
            }
          >
            {t('profile.settings')}
          </Tabs.Tab>
        )}
      </Tabs.List>
      <Tabs.Panel value="memes" pt="xs">
        <Text>""</Text>
      </Tabs.Panel>
      <Tabs.Panel value="posts" pt="xs">
        {profilePostsList && (
          <PostList postList={profilePostsList} isLoading={isLoading} />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="following" pt="xs">
        <ScrollArea>
          <SimpleGrid cols={3} variant="hover">
            {profileFollowingList && (
              <UserList
                listItem={(item, values) => (
                  <UserListItemCard
                    user={item}
                    onRemoveUser={handleRemoveFollowing}
                    handleItemClick={handleItemClick}
                    isLoading={isLoading}
                    isCurrentUser={isCurrentUser}
                  />
                )}
                userList={profileFollowingList}
                currentList={profileFollowingList}
                isLoading={isLoading}
                hideExisting={false}
              />
            )}
          </SimpleGrid>
        </ScrollArea>
      </Tabs.Panel>
      {isCurrentUser && (
        <Tabs.Panel value="settings" pt="xs">
          <ProfileSettings user={user} />
        </Tabs.Panel>
      )}
    </Tabs>
  );
}

export default ProfileTabs;
