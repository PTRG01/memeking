import { NavLink as MantineNavLink, Stack } from '@mantine/core';
import { useNavigate, NavLink } from 'react-router-dom';
import { Cardboards, Users } from 'tabler-icons-react';
import { navigateData } from '../../../utils/navigate';

export function GroupTabs() {
  const navigate = useNavigate();

  return (
    <Stack align="stretch">
      <NavLink
        to="/groups/feed"
        style={({ isActive, isPending }) => {
          return { textDecoration: 'none' };
        }}
      >
        {({ isActive }) => (
          <MantineNavLink
            label="Your feed"
            icon={<Cardboards />}
            active={isActive}
            onClick={() => navigate(navigateData.groupsFeed)}
          />
        )}
      </NavLink>
      <NavLink
        to="/groups/joins"
        style={({ isActive, isPending }) => {
          return { textDecoration: 'none' };
        }}
      >
        {({ isActive }) => (
          <MantineNavLink
            label="Your groups"
            icon={<Users />}
            active={isActive}
            onClick={() => navigate(navigateData.groupsJoins)}
          />
        )}
      </NavLink>
    </Stack>
  );
}

export default GroupTabs;
