import { NavLink, Stack } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cardboards, Users } from 'tabler-icons-react';

/* eslint-disable-next-line */
export interface GroupsTabsProps {}

export function GroupTabs(props: GroupsTabsProps) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const handleFeedTab = () => {
    navigate('/groups/feed');
    setActive(0);
  };
  const handleJoinsTab = () => {
    navigate('/groups/joins');
    setActive(1);
  };
  return (
    <Stack align="stretch">
      <NavLink
        label="Your feed"
        icon={<Cardboards />}
        active={active === 0}
        onClick={() => handleFeedTab()}
      />
      <NavLink
        label="Your groups"
        icon={<Users />}
        active={active === 1}
        onClick={() => handleJoinsTab()}
      />
    </Stack>
  );
}

export default GroupTabs;
