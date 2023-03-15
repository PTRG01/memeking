import { useContext } from 'react';
import { TextInput, Button, Group, Center } from '@mantine/core';
import { useForm } from '@mantine/form/';
import { AuthContext } from '../../contexts/auth-provider/auth-provider';

/* eslint-disable-next-line */
export interface ISigninProps {}

export function Signin(props: ISigninProps) {
  const setUser = useContext(AuthContext);
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
      <Group title="Sign Up">
        <form onSubmit={form.onSubmit((values) => setUser?.signIn(values))}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="test@test.com"
            {...form.getInputProps('email')}
          />

          <TextInput
            withAsterisk
            label="Password"
            placeholder="Password"
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
