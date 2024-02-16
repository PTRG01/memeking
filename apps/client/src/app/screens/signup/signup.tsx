import {
  TextInput,
  Button,
  Group,
  PasswordInput,
  Stack,
  Container,
} from '@mantine/core';
import { useForm, hasLength } from '@mantine/form/';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import PasswordStrenghtInput from '../../components/password-input/password-strength-input';

export function Signup() {
  const { signUp, isLoading } = useAuthContext();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      emailVisibility: true,
      password: 'secret',
      passwordConfirm: 'secret',
      name: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('signup.email')),
      name: hasLength({ min: 2, max: 20 }, t('signup.nameReq')),
      username: hasLength({ min: 2, max: 10 }, t('signup.usernameReq')),
      passwordConfirm: (value, values) =>
        value !== values.password ? t('signup.passwordNotMatch') : null,
    },
  });
  return (
    <Container fluid maw={500}>
      <Stack align="stretch">
        <form onSubmit={form.onSubmit((values) => signUp(values))}>
          <Stack>
            <TextInput
              mb={10}
              size="md"
              withAsterisk
              disabled={isLoading}
              label={t('signup.username')}
              placeholder={t('signup.username')}
              {...form.getInputProps('username')}
            />
            <TextInput
              mb={10}
              size="md"
              withAsterisk
              disabled={isLoading}
              label={t('signup.name')}
              placeholder={t('signup.placeholderName')}
              {...form.getInputProps('name')}
            />
            <TextInput
              mb={10}
              size="md"
              withAsterisk
              disabled={isLoading}
              label={t('signup.email')}
              placeholder={t('signup.placeholderEmail')}
              {...form.getInputProps('email')}
            />
            <PasswordStrenghtInput {...form.getInputProps('password')} />
            <PasswordInput
              mt={10}
              size="md"
              withAsterisk
              disabled={isLoading}
              label={t('signup.confirm')}
              {...form.getInputProps('passwordConfirm')}
            />
          </Stack>

          <Group position="right" mt="lg">
            <Button disabled={isLoading} loading={isLoading} type="submit">
              {t('header.signup')}
            </Button>
          </Group>
        </form>
      </Stack>{' '}
    </Container>
  );
}

export default Signup;
