import { Button, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import AuthLoader from '../../components/auth-loader/auth-loader';
import ChatList from '../../components/chat/chat-list/chat-list';

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
        <AuthLoader>
          <Group>
            {isLoggedIn && <ChatList />}

            {!isLoggedIn && (
              <Button
                size="xs"
                variant="default"
                onClick={() => navigate('/signin')}
              >
                {t('header.signin')}
              </Button>
            )}
            {!isLoggedIn && (
              <Button size="xs" onClick={() => navigate('/signup')}>
                {t('header.signup')}
              </Button>
            )}
            {isLoggedIn && (
              <Button size="xs" onClick={() => navigate('/profile')}>
                {t('header.profile')}
              </Button>
            )}
            {isLoggedIn && (
              <Button size="xs" onClick={() => logout()}>
                {t('header.signout')}
              </Button>
            )}
          </Group>
        </AuthLoader>

        <Group position="right">
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
