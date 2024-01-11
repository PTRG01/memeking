import { useMemo } from 'react';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import { IChat } from '../../contexts/chat-provider/chat-provider.interface';

interface IUserListProps {
  listItem: (item: IUser, values?: string[]) => JSX.Element;
  userList: IUser[] | null;
  currentList: IUser[] | IChat[] | null;
  isLoading: boolean;
  hideExisting: boolean;
}

function UserList({
  listItem,
  userList,
  currentList,
  hideExisting,
}: IUserListProps) {
  const currentListIds = useMemo(
    () => currentList?.map((user) => user?.id),
    [currentList]
  );
  const filteredList = useMemo(
    () => userList?.filter((user) => !currentListIds?.includes(user?.id)),
    [currentListIds, userList]
  );
  if (!userList) return null;
  return (
    <div>
      {hideExisting
        ? filteredList?.map((user: IUser) => (
            <div key={user.id}>{listItem(user, currentListIds)}</div>
          ))
        : userList?.map((user: IUser) => (
            <div key={user.id}>{listItem(user, currentListIds)}</div>
          ))}
    </div>
  );
}

export default UserList;
