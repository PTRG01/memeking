import { Avatar, Button, Flex, Text, Title } from '@mantine/core';

/* eslint-disable-next-line */
export interface IGroupItemProps {
  children: React.ReactNode;
}

export function GroupItem({ children }: IGroupItemProps) {
  return (
    <Button
      variant="light"
      leftIcon={<Avatar size="md" radius={100} />}
      fullWidth
      color="gray"
      radius="md"
      my={5}
      style={{ display: 'flex' }}
    >
      <Flex justify="flex-start" direction="column" align="flex-start">
        <Title size={12} weight={400}>
          Test Group Title: {children}
        </Title>
        <Text size={10} weight={100}>
          Test Group Text: {children}
        </Text>
      </Flex>
    </Button>
  );
}

export default GroupItem;
