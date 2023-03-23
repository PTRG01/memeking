import { Box, Group, ThemeIcon, UnstyledButton } from '@mantine/core';
import { Cards, GoGame, Social } from 'tabler-icons-react';
import { useTranslation, Trans } from 'react-i18next';
/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  // TODO add hover effects, improve ui of navbar, add routing
  const { t, i18n } = useTranslation();

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
          <Box ml="md">
            <Trans i18nKey="nav.games"></Trans>
          </Box>
        </Group>
      </UnstyledButton>
      <UnstyledButton>
        <Group position="apart">
          <ThemeIcon color="grape" size={30}>
            <Social size="1.1rem" />
          </ThemeIcon>
          <Box ml="md">
            {' '}
            <Trans i18nKey="nav.groups"></Trans>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
}

export default Navbar;
