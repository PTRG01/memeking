import { TextInput, Button, Group, Center } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form/';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';

/* eslint-disable-next-line */
export interface ISignupProps {}

export function Signup(props: ISignupProps) {
  const { signUp } = useAuthContext();
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
            label="Username"
            placeholder="Username"
            {...form.getInputProps('username')}
          />
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your name"
            {...form.getInputProps('name')}
          />
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
          <TextInput
            withAsterisk
            label="Confirm Password"
            {...form.getInputProps('passwordConfirm')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Sign Up</Button>
          </Group>
        </form>
      </Group>
    </Center>
  );
}

export default Signup;
