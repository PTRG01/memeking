import { Flex, ScrollArea } from '@mantine/core';
import UserSearch from '../user-search/user-search';
import UserList from '../user-list/user-list';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import UserListItemInline from '../user-list-item-inline/user-list-item-inline';
import LoaderComponent from '../loader/loader';
import { useNavigate } from 'react-router-dom';

export function FollowersSearch() {
  const {
    handleSearch,
    followersSearchList,
    followingList,
    handleAddFollowing,
    handleRemoveFollowing,
    isLoading,
    isUserLoading,
    isSearchLoading,
  } = useChatContext();

  const navigate = useNavigate();
  return (
    <Flex>
      <UserSearch handleSearch={handleSearch}>
        <LoaderComponent isLoading={isLoading}>
          {
            <ScrollArea
              type="hover"
              mih={followersSearchList.length > 0 ? 100 : 0}
            >
              <UserList
                listItem={(item, values) => (
                  <UserListItemInline
                    user={item}
                    values={values}
                    onAddUser={handleAddFollowing}
                    onRemoveUser={handleRemoveFollowing}
                    onItemClick={() => navigate(`profile/${item?.id}`)}
                    itemActive={false}
                    isLoading={isUserLoading}
                  />
                )}
                userList={followersSearchList}
                currentList={followingList}
                isLoading={isSearchLoading}
                hideExisting={false}
              />
            </ScrollArea>
          }
        </LoaderComponent>
      </UserSearch>
    </Flex>
  );
}

export default FollowersSearch;
