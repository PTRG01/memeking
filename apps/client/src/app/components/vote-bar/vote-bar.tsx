import { Button, Container, Divider, Flex, Group, Text } from '@mantine/core';
import { ThumbUp } from 'tabler-icons-react';

/* eslint-disable-next-line */
export interface IVoteBarProps {
  handleVoteFunction: () => void;
  voteCount: number;
}

export function VoteBar({ handleVoteFunction, voteCount = 0 }: IVoteBarProps) {
  return (
    <Container>
      <Divider mb={10} />
      <Flex justify="space-between">
        <Button px={50} color="gray" onClick={handleVoteFunction}>
          <ThumbUp />
        </Button>
        <Group>
          <Text>Likes:</Text>
          <Text>{voteCount}</Text>
        </Group>
      </Flex>
    </Container>
  );
}

export default VoteBar;
