import { Button, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslateContext } from '../../contexts/translate-provider/translate-provider';
import { FormattedMessage } from 'react-intl';
/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { isLoggedIn } = useAuthContext();
  const { setLocale } = useTranslateContext();
  const { logout } = useAuthContext();
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
        {!isLoggedIn && (
          <Button
            size="xs"
            variant="default"
            onClick={() => navigate('/signin')}
          >
            <FormattedMessage id={'header.signin'}></FormattedMessage>
          </Button>
        )}
        {!isLoggedIn && (
          <Button size="xs" onClick={() => navigate('/signup')}>
            <FormattedMessage id={'header.signup'}></FormattedMessage>
          </Button>
        )}
        {isLoggedIn && (
          <Button size="xs" onClick={() => logout()}>
            Sign Out
          </Button>
        )}
        <Group position="right">
          {' '}
          <Button size="xs" onClick={() => setLocale('en-US')}>
            EN
          </Button>
          <Button size="xs" onClick={() => setLocale('pl-PL')}>
            PL
          </Button>
        </Group>
      </Group>
    </>
  );
}

export default Header;
