import { Button, Group, Text } from '@mantine/core';
import Signup from '../../screens/signup/signup';
/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
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
        <Button size="xs" variant="default">
          Log in
        </Button>
        <Button size="xs" onClick={() => console.log('test')}>
          Sign Up
        </Button>
      </Group>
    </>
  );
}

export default Header;
