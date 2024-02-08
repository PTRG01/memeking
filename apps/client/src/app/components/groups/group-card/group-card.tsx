import {
  Avatar,
  Button,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DoorExit, Dots, SquareLetterX } from 'tabler-icons-react';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { createImageUrl } from '../../../utils/image-url';
import ConfirmModal from '../../confirm-modal/confirm-modal';

export interface IGroupCardProps {
  group: IGroup;
}

export function GroupCard({ group }: IGroupCardProps) {
  const { user } = useAuthContext();
  const { leaveGroup, deleteGroup } = useGroupContext();
  const navigate = useNavigate();
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const { t } = useTranslation();

  const currentUsersGroup = useMemo(
    () => group?.author_id === user?.id,
    [group, user]
  );

  return (
    <Paper p={15} radius={10}>
      <Group mb={20}>
        <Avatar
          size="xl"
          radius={15}
          src={
            group?.avatar && createImageUrl('groups', group?.id, group.avatar)
          }
        />
        <Stack>
          <Title size="sm">{group.title}</Title>
          <Text>{t('groups.lastVisited')}</Text>
        </Stack>
      </Group>

      <Group noWrap>
        <Button fullWidth onClick={() => navigate(`/groups/${group.id}`)}>
          {t('groups.viewGroup')}
        </Button>
        <Menu>
          <Menu.Target>
            <Button color="gray">
              <Dots />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<DoorExit />}
              onClick={() => setIsLeaveConfirmOpen(true)}
            >
              {t('groups.leave')}
            </Menu.Item>
            {currentUsersGroup && (
              <Menu.Item
                icon={<SquareLetterX />}
                onClick={() => setIsDeleteConfirmOpen(true)}
              >
                {t('groups.delete')}
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Group>
      <ConfirmModal
        title="Confirm leave"
        message="Are you sure, you want to leave this group?"
        onConfirm={() => leaveGroup(group?.id, group?.users)}
        onCancel={() => setIsLeaveConfirmOpen(false)}
        onClose={setIsLeaveConfirmOpen}
        open={isLeaveConfirmOpen}
      />
      <ConfirmModal
        title="Confirm delete"
        message="Are you sure, you want to delete this group?"
        onConfirm={() => deleteGroup(group?.id)}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onClose={setIsDeleteConfirmOpen}
        open={isDeleteConfirmOpen}
      />
    </Paper>
  );
}

export default GroupCard;
