import { useContext } from 'react';
import { TextInput, Checkbox, Button, Group, Center } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form/';
import { AuthContext } from '../../contexts/auth-provider/auth-provider';

/* eslint-disable-next-line */
export interface ISignupProps {}

export function Signup(props: ISignupProps) {
  const setUser = useContext(AuthContext);
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
        <form onSubmit={form.onSubmit((values) => setUser?.signUp(values))}>
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
            placeholder="Password"
            {...form.getInputProps('password')}
          />
          <TextInput
            withAsterisk
            label="Confirm Password"
            placeholder=" Confirm password"
            {...form.getInputProps('passwordConfirm')}
          />
          {/* <Checkbox
            mt="md"
            label="I agree to terms of service"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          /> */}

          <Group position="right" mt="md">
            <Button type="submit">Sign Up</Button>
          </Group>
        </form>
      </Group>
    </Center>
  );
}

export default Signup;
