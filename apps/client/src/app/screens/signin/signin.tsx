import {
  TextInput,
  Button,
  Group,
  PasswordInput,
  Container,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form/';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function Signin() {
  const { signIn, isAuthLoading, isLoggedIn } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSignin = () => {
    signIn(form.values);
    if (isLoggedIn) navigate('/feed');
  };

  return (
    <Container fluid maw={400}>
      <Stack align="stretch">
        <form onSubmit={form.onSubmit((values) => handleSignin())}>
          <Stack>
            <TextInput
              mb={10}
              size="md"
              withAsterisk
              disabled={isAuthLoading}
              label={t('signup.email')}
              placeholder={t('signup.placeholderEmail')}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              size="md"
              withAsterisk
              disabled={isAuthLoading}
              label={t('signup.password')}
              {...form.getInputProps('password')}
            />
          </Stack>

          <Group position="right" mt="md">
            <Button
              loading={isAuthLoading}
              disabled={isAuthLoading}
              type="submit"
            >
              {t('header.signin')}
            </Button>
          </Group>
        </form>
      </Stack>
    </Container>
  );
}

export default Signin;
