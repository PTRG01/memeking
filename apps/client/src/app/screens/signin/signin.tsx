import { TextInput, Button, Group, Center } from '@mantine/core';
import { useForm } from '@mantine/form/';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
/* eslint-disable-next-line */
export interface ISigninProps {}

export function Signin(props: ISigninProps) {
  const { signIn } = useAuthContext();
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
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <TextInput
            withAsterisk
            label="Password"
            {...form.getInputProps('password')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Sign In</Button>
          </Group>
        </form>
      </Group>
    </Center>
  );
}

export default Signin;
