import {
  Button,
  Container,
  Overlay,
  Text,
  Title,
  Group,
  Stack,
  Image,
  AspectRatio,
  Box,
  Collapse,
  Center,
  BackgroundImage,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import Signin from '../../screens/signin/signin';
import { useState } from 'react';
import Signup from '../../screens/signup/signup';

export function HeroHeader() {
  const { t } = useTranslation();

  const [isSigninOpened, setIsSigninOpened] = useState(false);
  const [isSignupOpened, setIsSignupOpened] = useState(false);

  const handleSigninOpen = () => {
    setIsSigninOpened(!isSigninOpened);
    setIsSignupOpened(false);
  };
  const handleSignupOpen = () => {
    setIsSignupOpened(!isSignupOpened);
    setIsSigninOpened(false);
  };
  return (
    <Overlay
      style={{
        background: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `url(https://cdn.pixabay.com/photo/2021/02/24/20/53/abstract-6047465_1280.jpg`,
      }}
    >
      <Overlay color="#000" opacity={0.65} zIndex={1} blur={30}>
        <Center>
          <Stack align="stretch" p={100} justify="space-between">
            <Title
              size={50}
              gradient={{ from: 'blue', to: 'cyan' }}
              inherit
              mb={15}
            >
              Meme
              <span role="img" aria-label="crown emoji">
                &#128081;
              </span>
              king
            </Title>
            <Container size={740}>
              <Text size="lg" weight={500} ml={-15}>
                Welcome to MemeKing, where laughter is our currency and
                creativity knows no bounds! Join our hilariously wild community
                of meme enthusiasts.
              </Text>
              <Text size="lg" weight={500} ml={-15}>
                Get ready to meme your heart out in the friendliest corner of
                the internet.
              </Text>
              <Text size="lg" weight={500} ml={-15}>
                MemeKing: Because life's too short not to share a good laugh!
              </Text>
            </Container>
            <Group mt={20}>
              <Button size="lg" onClick={() => handleSigninOpen()}>
                {t('header.signin')}
              </Button>
              <Button
                size="lg"
                variant="light"
                onClick={() => handleSignupOpen()}
              >
                {t('header.signup')}
              </Button>
            </Group>
            <Collapse in={isSigninOpened} mt={30}>
              <Center mb={30}>
                <Stack>
                  <Text color="red">
                    Preview mode, for testing purposes use following data:
                  </Text>
                  <Text color="red">email: test1@example.com</Text>
                  <Text color="red">password: !Password1</Text>
                </Stack>
              </Center>
              <Signin />
            </Collapse>
            <Collapse in={isSignupOpened} mt={30}>
              <Signup />
            </Collapse>
          </Stack>
        </Center>
      </Overlay>
    </Overlay>
  );
}

export default HeroHeader;
