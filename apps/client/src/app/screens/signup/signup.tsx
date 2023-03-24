import { TextInput, Button, Group, Center } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form/';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface ISignupProps {}

export function Signup(props: ISignupProps) {
  const { signUp } = useAuthContext();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      emailVisibility: true,
      password: '',
      passwordConfirm: '',
      name: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      username: hasLength(
        { min: 2, max: 10 },
        'Name must be 2-10 characters long'
      ),
    },
  });
  return (
    <Center>
      <Group title="Sign Up">
        <form onSubmit={form.onSubmit((values) => signUp(values))}>
          <TextInput
            withAsterisk
            label={t('form.username')}
            placeholder={t('form.username')}
            {...form.getInputProps('username')}
          />
          <TextInput
            withAsterisk
            label={t('form.name')}
            placeholder={t('form.placeholderName')}
            {...form.getInputProps('name')}
          />
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
          <TextInput
            withAsterisk
            label={t('form.confirm')}
            {...form.getInputProps('passwordConfirm')}
          />

          <Group position="right" mt="md">
            <Button type="submit">{t('header.signup')}</Button>
          </Group>
        </form>
      </Group>
    </Center>
  );
}

export default Signup;
