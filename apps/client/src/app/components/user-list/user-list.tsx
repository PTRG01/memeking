import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import UserListItem from '../user-list-item/user-list-item';
import {
  IChat,
  THandleAddFollowingFunction,
} from '../../contexts/chat-provider/chat-provider.interface';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';
interface IUserListProps {
  userList: IUser[] | null;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  handleItemClick: (id: string) => void;
  currentList: IUser[] | IChat[] | null;
  isLoading: boolean;
  itemActive: boolean;
  hideExisting: boolean;
  card?: boolean;
}

function UserList({
  userList,
  onAddUser,
  onRemoveUser,
  currentList,
  isLoading,
  itemActive,
  handleItemClick,
  hideExisting,
  card = false,
}: IUserListProps) {
  const currentListIds = currentList?.map((user) => user?.id);
  const filteredList = userList?.filter(
    (user) => !currentListIds?.includes(user.id)
  );

  return (
    <>
      {hideExisting
        ? filteredList?.map((user: IUser) => (
            <UserListItem
              label={user.name}
              avatar={user.avatar}
              id={user.id}
              key={user.id}
              onAddUser={onAddUser}
              onRemoveUser={onRemoveUser}
              values={currentListIds}
              isLoading={isLoading}
              itemActive={itemActive}
              handleItemClick={handleItemClick}
              card={card}
            />
          ))
        : userList?.map((user: IUser) => (
            <UserListItem
              label={user.name}
              avatar={user.avatar}
              id={user.id}
              key={user.id}
              onAddUser={onAddUser}
              onRemoveUser={onRemoveUser}
              values={currentListIds}
              isLoading={isLoading}
              itemActive={itemActive}
              handleItemClick={handleItemClick}
              card={card}
            />
          ))}
    </>
  );
}

export default UserList;
