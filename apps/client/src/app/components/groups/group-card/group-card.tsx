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

/* eslint-disable-next-line */
export interface IGroupCardProps {
  group: IGroup;
}

export function GroupCard({ group }: IGroupCardProps) {
  const { user } = useAuthContext();
  const { leaveGroup, deleteGroup } = useGroupContext();
  const navigate = useNavigate();

  const currentUsersGroup = group?.author_id === user?.id;

  return (
    <Paper p={15} radius={10}>
      <Group mb={20}>
        <Avatar size="xl" radius={15} />
        <Stack>
          <Title size="sm">{group.title}</Title>
          <Text>Last visited:</Text>
        </Stack>
      </Group>

      <Group noWrap>
        <Button fullWidth onClick={() => navigate(`/groups/${group.id}`)}>
          View group
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
              onClick={() => leaveGroup(group?.id, group?.users)}
            >
              Leave group
            </Menu.Item>
            {currentUsersGroup && (
              <Menu.Item
                icon={<SquareLetterX />}
                onClick={() => deleteGroup(group?.id)}
              >
                Delete group
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
}

export default GroupCard;
