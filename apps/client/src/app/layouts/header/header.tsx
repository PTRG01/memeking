import { Button, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <Group>
        <Text>
          Meme
          <span role="img" aria-label="crown emoji">
            &#128081;
          </span>
          King
        </Text>
      </Group>

      <Group position="right">
        {/* TODO add account menu when loggedIn */}
        <Button size="xs" variant="default" onClick={() => navigate('/signin')}>
          Log in
        </Button>
        <Button size="xs" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </Group>
    </>
  );
}

export default Header;
