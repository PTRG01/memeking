// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import {
  AuthProvider,
  useAuthContext,
} from './contexts/auth-provider/auth-provider';

const TestComponent = () => {
  const { signIn } = useAuthContext();

  return (
    <button
      onClick={() =>
        signIn({
          email: 'test@test.com',
          password: 'test1234',
        })
      }
    >
      Login
    </button>
  );
};

export function App() {
  return (
    <AuthProvider>
        <TestComponent />
      </AuthProvider>
  );
}

export default App;
