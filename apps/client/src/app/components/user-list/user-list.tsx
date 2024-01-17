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
  const currentListIds = currentList?.map((user) => user?.id);
  const filteredList = userList?.filter(
    (user) => !currentListIds?.includes(user.id)
  );

  return (
    <>
      {hideExisting
        ? filteredList?.map((user: IUser) => (
            <div key={user.id}>{listItem(user, currentListIds)}</div>
          ))
        : userList?.map((user: IUser) => (
            <div key={user.id}>{listItem(user, currentListIds)}</div>
          ))}
    </>
  );
}

export default UserList;
