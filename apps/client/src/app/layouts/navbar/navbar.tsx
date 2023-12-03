import {
  Box,
  Button,
  Group,
  ThemeIcon,
  UnstyledButton,
  Stack,
  CloseButton,
} from '@mantine/core';
import { Cards, GoGame, Plus, Social } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useNavigate } from 'react-router-dom';
import GroupForm from '../../components/groups/group-form/group-form';
import GroupList from '../../components/groups/group-list/group-list';
import { useGroupContext } from '../../contexts/group-provider/group-provider';
import { useState } from 'react';
import GroupTabs from '../../components/groups/groups-tabs/group-tabs';
/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  // TODO add hover effects, improve ui of navbar, add routing
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  // const { isLoading, isCreating } = useGroupContext();
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
              {/* <UnstyledButton>
          <Group>
            <ThemeIcon color="indigo" size={30}>
              <GoGame size="1.1rem" />
            </ThemeIcon>
            <Box onClick={() => navigate('/games')}>{t('nav.games')}</Box>
          </Group>
        </UnstyledButton> */}
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
              <GroupTabs />
              <Button
                onClick={() => navigate('/groups/create')}
                leftIcon={<Plus />}
              >
                Create new group
              </Button>
              <GroupList />
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
                onClick={() => navigate('/groups/:feed')}
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
