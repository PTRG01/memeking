import { Box, Group, ThemeIcon, UnstyledButton } from '@mantine/core';
import { Cards, GoGame, Social } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  // TODO add hover effects, improve ui of navbar, add routing
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box>
      <UnstyledButton mb={8}>
        <Group position="apart">
          <ThemeIcon color="yellow" size={30}>
            <Cards size="1.1rem" />
          </ThemeIcon>
          <Box ml="md">Feed</Box>
        </Group>
      </UnstyledButton>
      <UnstyledButton mb={8}>
        <Group position="apart">
          <ThemeIcon color="indigo" size={30}>
            <GoGame size="1.1rem" />
          </ThemeIcon>
          <Box ml="md" onClick={() => navigate('/games')}>
            {t('nav.games')}
          </Box>
        </Group>
      </UnstyledButton>
      <UnstyledButton>
        <Group position="apart">
          <ThemeIcon color="grape" size={30}>
            <Social size="1.1rem" />
          </ThemeIcon>
          <Box ml="md" onClick={() => navigate('/groups')}>
            {' '}
            {t('nav.groups')}
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
}

export default Navbar;
