import { UserSearch } from '../../user-search/user-search';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import { Group, Title } from '@mantine/core';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import { useChatWindowContext } from '../../../contexts/chat-window-provider/chat-window-provider';
import UserList from '../../user-list/user-list';
import UserListItemInline from '../../user-list-item-inline/user-list-item-inline';

/* eslint-disable-next-line */

export interface IAddToChatListProps {
  id: string;
  users: string[];
}

export function ChatAddList() {
  const { isLoading } = useAuthContext();
  const { followingList } = useChatContext();
  const {
    currentChatUsers,
    updateChat,
    chatToAddList,
    handleSearchToAdd,
    isSearchUsed,
  } = useChatWindowContext();
  return (
    <Group>
      <UserSearch handleSearch={handleSearchToAdd} loading={isLoading}>
        <UserList
          listItem={(item, values) => (
            <UserListItemInline
              user={item}
              values={values}
              onAddUser={updateChat}
              onRemoveUser={() => ''}
              // TODO Fix unnecessary function
              handleItemClick={() => ''}
              itemActive={false}
              isLoading={isLoading}
            />
          )}
          userList={chatToAddList}
          currentList={currentChatUsers}
          isLoading={isLoading}
          hideExisting
        />
      </UserSearch>

      {!isSearchUsed ? (
        <Group>
          <Title size={15}>Following:</Title>
          <UserList
            listItem={(item, values) => (
              <UserListItemInline
                user={item}
                values={values}
                onAddUser={updateChat}
                onRemoveUser={() => ''}
                handleItemClick={() => ''}
                itemActive={false}
                isLoading={isLoading}
              />
            )}
            userList={followingList}
            currentList={currentChatUsers}
            isLoading={isLoading}
            hideExisting
          />
        </Group>
      ) : null}
    </Group>
  );
}

export default ChatAddList;
