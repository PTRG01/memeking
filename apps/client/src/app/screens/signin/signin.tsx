import { TextInput, Button, Group, Center } from '@mantine/core';
import { useForm } from '@mantine/form/';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface ISigninProps {}

export function Signin(props: ISigninProps) {
  const { signIn } = useAuthContext();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  return (
    <Center>
      <Group title="Sign In">
        <form onSubmit={form.onSubmit((values) => signIn(values))}>
          <TextInput
            withAsterisk
            label={t('form.email')}
            placeholder={t('form.placeholderEmail')}
            {...form.getInputProps('email')}
          />

          <TextInput
            withAsterisk
            label={t('form.password')}
            {...form.getInputProps('password')}
          />

          <Group position="right" mt="md">
            <Button type="submit">{t('header.signin')}</Button>
          </Group>
        </form>
      </Group>
    </Center>
  );
}

export default Signin;
