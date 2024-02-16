import { Button, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import AuthLoader from '../../components/auth-loader/auth-loader';
import ChatList from '../../components/chat/chat-list/chat-list';
import LanguageMenu from '../../components/language-menu/language-menu';
import ProfileMenu from '../../components/profile-menu/profile-menu';

export function Header() {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <Button variant="transparent" onClick={() => navigate('/')}>
        <Text>
          Meme
          <span role="img" aria-label="crown emoji">
            &#128081;
          </span>
          King
        </Text>
      </Button>

      <Group position="right">
        <AuthLoader>
          <Group>
            {isLoggedIn && <ChatList />}

            {isLoggedIn && <ProfileMenu />}
          </Group>
        </AuthLoader>
        <Group position="right">
          <LanguageMenu />
        </Group>
      </Group>
    </>
  );
}

export default Header;
