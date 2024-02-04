import {
  Avatar,
  Button,
  Title,
  Menu,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';
import { THandleAddFollowingFunction } from '../../contexts/chat-provider/chat-provider.interface';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import { useCallback, useState } from 'react';
import { CirclePlus, Dots, Loader, X } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';
import { createImageUrl } from '../../utils/image-url';
import { toUppercase } from '../../utils/uppercase';
import ConfirmModal from '../confirm-modal/confirm-modal';

export interface IUserListItemInlineProps {
  user: IUser;
  values?: string[];
  itemActive: boolean;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  isLoading: boolean;
  onItemClick?: (value: string) => void;
}

function UserListItemInline({
  user,
  values,
  onAddUser,
  onRemoveUser,
  isLoading,
  onItemClick,
}: IUserListItemInlineProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handleValues = useCallback(() => {
    if (values?.includes(user.id)) {
      onRemoveUser(user.id);
    } else {
      onAddUser(user.id);
    }
  }, [onAddUser, onRemoveUser, user, values]);
  return (
    <>
      <Button.Group mb={5}>
        <Button
          styles={(theme) => ({
            root: {
              display: 'flex',
            },
          })}
          fullWidth
          color="gray"
          leftIcon={
            <Avatar
              radius={100}
              size="md"
              src={
                user?.avatar && createImageUrl('users', user?.id, user?.avatar)
              }
            />
          }
          disabled={isLoading}
          size="lg"
          variant="subtle"
          onClick={() => (onItemClick ? onItemClick(user.id) : null)}
        >
          <Title size={14} weight={500}>
            {toUppercase(user?.name)}
          </Title>
        </Button>
        {isLoading ? (
          <Button size="lg" variant="subtle" disabled color="gray">
            <Loader size={30} />
          </Button>
        ) : values?.includes(user.id) ? (
          <Menu variant="subtle">
            <Menu.Target>
              <Button size="lg" variant="subtle" color="gray">
                <Dots size={20} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={
                  <X
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[5]}
                  />
                }
                onClick={() => setIsConfirmOpen(true)}
              >
                {t('profile.unfollow')}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button
            variant="subtle"
            color="gray"
            size="lg"
            onClick={handleValues}
            loading={isLoading}
            disabled={isLoading}
          >
            <CirclePlus stroke="green" />
          </Button>
        )}
      </Button.Group>
      <ConfirmModal
        message="Are you sure, you want to unfollow this user?"
        onConfirm={() => onRemoveUser(user?.id)}
        onCancel={() => setIsConfirmOpen(false)}
        onClose={setIsConfirmOpen}
        open={isConfirmOpen}
      />
    </>
  );
}

export default UserListItemInline;
