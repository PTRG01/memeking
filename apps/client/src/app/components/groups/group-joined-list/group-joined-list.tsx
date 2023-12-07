import {
  Avatar,
  Button,
  Group,
  HoverCard,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  NavLink,
} from '@mantine/core';
import {
  GroupProvider,
  useGroupContext,
} from '../../../contexts/group-provider/group-provider';
import { Dots } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import LoaderComponent from '../../loader/loader';

/* eslint-disable-next-line */
export interface IGroupJoinedListProps {}

export function GroupJoinedList(props: IGroupJoinedListProps) {
  const { groupListResult, isPostsLoading } = useGroupContext();
  const navigate = useNavigate();
  return (
    <LoaderComponent isLoading={isPostsLoading}>
      <SimpleGrid
        px={20}
        cols={3}
        breakpoints={[
          { minWidth: 'xl', cols: 3, spacing: 'sm' },
          { minWidth: 'lg', cols: 2, spacing: 'sm' },
          { minWidth: 'md', cols: 1, spacing: 'sm' },
        ]}
      >
        {groupListResult?.map((group) => (
          <GroupProvider key={group.id} parentId={group.id}>
            <Paper p={15} radius={10}>
              <Group mb={20}>
                <Avatar size="xl" radius={15} />
                <Stack>
                  <Title size="sm">{group.title}</Title>
                  <Text>Last visited:</Text>
                </Stack>
              </Group>

              <Group noWrap>
                <Button
                  fullWidth
                  onClick={() => navigate(`/groups/${group.id}`)}
                >
                  View group
                </Button>
                <HoverCard>
                  <HoverCard.Target>
                    <Button color="gray">
                      <Dots />
                    </Button>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <NavLink label="Leave group" />
                  </HoverCard.Dropdown>
                </HoverCard>
              </Group>
            </Paper>
          </GroupProvider>
        ))}
      </SimpleGrid>
    </LoaderComponent>
  );
}

export default GroupJoinedList;
