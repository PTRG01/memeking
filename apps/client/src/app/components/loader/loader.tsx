import { Loader, Center } from '@mantine/core';
import { ReactElement } from 'react';
/* eslint-disable-next-line */
export interface ILoaderComponentProps {
  isLoading: boolean;
  children: ReactElement;
}

export const LoaderComponent = ({
  children,
  isLoading,
}: ILoaderComponentProps) => {
  return isLoading ? (
    <Center>
      <Loader />
    </Center>
  ) : (
    children
  );
};

export default LoaderComponent;
