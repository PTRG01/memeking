import {
  Button,
  Divider,
  Group,
  Image,
  Menu,
  Modal,
  Paper,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import { Route, Routes, useParams } from 'react-router-dom';
import {
  ArrowDown,
  DoorExit,
  Dots,
  Edit,
  Triangle,
  TriangleInverted,
  UserCheck,
  Users,
} from 'tabler-icons-react';
import GroupEditForm from '../group-edit-form/group-edit-form';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface IGroupHeaderProps {}

export function GroupHeader(props: IGroupHeaderProps) {
  const { groupListResult } = useGroupContext();
  const { groupId } = useParams();
  const [isOpened, setIsOpened] = useState(false);
  const currentGroup = groupListResult
    ?.filter((group) => group?.id === groupId)
    .at(0);

  return (
    <Paper radius={15} mb={10}>
      <Image
        height={200}
        radius={15}
        mb={15}
        withPlaceholder
        src={`http://127.0.0.1:8090/api/files/groups/${groupId}/${currentGroup?.avatar}`}
      />
      <Stack mah={500} px={15}>
        <Title>{currentGroup?.title}</Title>
        <Text>{currentGroup?.users.length} members</Text>
        <Text>{currentGroup?.aboutText}</Text>
        <Group position="right">
          <Menu>
            <Menu.Target>
              <Button
                color="gray"
                variant="light"
                leftIcon={<UserCheck />}
                rightIcon={<TriangleInverted fill="white" size={10} />}
              >
                Joined
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<DoorExit size={15} />}>Leave group</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Menu>
            <Menu.Target>
              <Button>
                <Dots />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => setIsOpened(!isOpened)}
                icon={<Edit size={15} />}
              >
                Edit group
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Divider mb={20} />
        <Modal opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
          <GroupEditForm />
        </Modal>
        {/* <Tabs>
          <Tabs.List>
            <Tabs.Tab value="discussion">Discussion</Tabs.Tab>
            <Tabs.Tab value="members">Members</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="discussion">
            <Routes>
              <Route />
            </Routes>
          </Tabs.Panel>
          <Tabs.Panel value="members">
            <Routes>
              <Route />
            </Routes>
          </Tabs.Panel>
        </Tabs> */}
      </Stack>
    </Paper>
  );
}

export default GroupHeader;
