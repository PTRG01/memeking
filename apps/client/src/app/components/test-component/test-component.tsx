import styles from './test-component.module.css';

/* eslint-disable-next-line */
export interface TestComponentProps {}

export function TestComponent(props: TestComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TestComponent!</h1>
    </div>
  );
}

export default TestComponent;
