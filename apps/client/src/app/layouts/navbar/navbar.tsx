import {
  Box,
  Button,
  Group,
  ThemeIcon,
  UnstyledButton,
  Stack,
  CloseButton,
  Title,
  Divider,
} from '@mantine/core';
import { Cards, Plus, Social } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useNavigate } from 'react-router-dom';
import GroupForm from '../../components/groups/group-form/group-form';
import GroupList from '../../components/groups/group-list/group-list';
import { useGroupContext } from '../../contexts/group-provider/group-provider';
import GroupTabs from '../../components/groups/groups-tabs/group-tabs';
import GroupSearch from '../../components/groups/group-search/group-search';
/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  // TODO add hover effects, improve ui of navbar, add routing
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { groupListResult } = useGroupContext();

  const handleGroupItemClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };
  return (
    <Stack>
      <Routes>
        <Route
          path="/*"
          element={
            <Stack>
              <UnstyledButton>
                <Group>
                  <ThemeIcon color="yellow" size={30}>
                    <Cards size="1.1rem" />
                  </ThemeIcon>
                  <Box>Feed</Box>
                </Group>
              </UnstyledButton>
              <UnstyledButton>
                <Group>
                  <ThemeIcon color="grape" size={30}>
                    <Social size="1.1rem" />
                  </ThemeIcon>
                  <Box onClick={() => navigate('/groups/:feed')}>
                    {t('nav.groups')}
                  </Box>
                </Group>
              </UnstyledButton>
            </Stack>
          }
        />
        <Route
          path="/groups/*"
          element={
            <Stack align="stretch">
              <Title size="h2">Groups</Title>
              <GroupSearch />
              <GroupTabs />
              <Button
                onClick={() => navigate('/groups/create')}
                leftIcon={<Plus />}
              >
                Create new group
              </Button>
              <Divider />
              <GroupList
                groupList={groupListResult}
                onItemClick={handleGroupItemClick}
              />
            </Stack>
          }
        />
        <Route
          path="groups/create"
          element={
            <Stack align="stretch">
              <CloseButton
                size="md"
                radius={50}
                onClick={() => navigate('/groups/feed')}
              />
              <GroupForm />
            </Stack>
          }
        ></Route>
      </Routes>
    </Stack>
  );
}

export default Navbar;
