import {
  Avatar,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface IGroupSearchListItemProps {
  group: IGroup;
}

export function GroupSearchListItem({ group }: IGroupSearchListItemProps) {
  const { joinGroup } = useGroupContext();
  const navigate = useNavigate();

  const handleJoinGroup = () => {
    joinGroup(group?.users, group?.id);
    navigate(`/groups/${group?.id}`);
  };
  return (
    <Paper p={15} mb={10} radius={15}>
      <Group position="apart" noWrap>
        <Group noWrap align="flex-start">
          <Avatar size="lg" radius={10} />

          <Stack spacing={0}>
            <UnstyledButton onClick={() => navigate(`/groups/${group?.id}`)}>
              <Title size="h2">{group?.title}</Title>
            </UnstyledButton>
            <Group spacing={0}>
              <Text>members</Text>
            </Group>
            <Text>
              {group?.aboutText}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
              ipsa eos doloribus illum, magnam consequuntur dolor accusamus rem
              nam ipsam laborum perferendis ipsum, unde voluptatem
              reprehenderit, atque obcaecati sint voluptate.
            </Text>
          </Stack>
        </Group>
        <Button onClick={() => handleJoinGroup()}>Join</Button>
      </Group>
    </Paper>
  );
}

export default GroupSearchListItem;
