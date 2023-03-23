import { Button, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation, Trans } from 'react-i18next';
import { changeLanguage } from 'i18next';
import i18next from '../../contexts/translate-provider/translate-provider';
/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { isLoggedIn } = useAuthContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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
            <Trans i18nKey={'header.signin'}></Trans>
          </Button>
        )}
        {!isLoggedIn && (
          <Button size="xs" onClick={() => navigate('/signup')}>
            <Trans i18nKey={'header.signup'}></Trans>
          </Button>
        )}
        {isLoggedIn && (
          <Button size="xs" onClick={() => logout()}>
            Sign Out
          </Button>
        )}
        <Group position="right">
          {' '}
          <Button
            size="xs"
            key={'en'}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </Button>
          <Button
            size="xs"
            key={'pl'}
            onClick={() => i18n.changeLanguage('pl')}
          >
            PL
          </Button>
        </Group>
      </Group>
    </>
  );
}

export default Header;
