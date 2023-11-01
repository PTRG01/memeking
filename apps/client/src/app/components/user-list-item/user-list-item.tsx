import { THandleAddFollowingFunction } from '../../contexts/chat-provider/chat-provider.interface';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';
import UserListItemCard from '../user-list-item-card/user-list-item-card';
import UserListItemInline from '../user-list-item-inline/user-list-item-inline';

/* eslint-disable-next-line */

export interface IUserListItemProps {
  label: string;
  avatar: string;
  id: string;
  values: string[] | undefined;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  handleItemClick: (id: string) => void;
  isLoading: boolean;
  card?: boolean;
  itemActive: boolean;
}

export function UserListItem({
  label,
  avatar,
  id,
  values,
  onAddUser,
  onRemoveUser,
  handleItemClick,
  isLoading,
  card,
  itemActive,
}: IUserListItemProps) {
  if (card) {
    return (
      <UserListItemCard
        id={id}
        label={label}
        avatar={avatar}
        isLoading={isLoading}
        onAddUser={onAddUser}
        onRemoveUser={onRemoveUser}
        values={values}
        handleItemClick={handleItemClick}
        itemActive={itemActive}
      />
    );
  } else {
    return (
      <UserListItemInline
        id={id}
        label={label}
        avatar={avatar}
        isLoading={isLoading}
        onAddUser={onAddUser}
        onRemoveUser={onRemoveUser}
        values={values}
        handleItemClick={handleItemClick}
        itemActive={itemActive}
      />
    );
  }
}

export default UserListItem;
