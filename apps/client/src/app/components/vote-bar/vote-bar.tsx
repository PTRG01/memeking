import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  HoverCard,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { ThumbUp } from 'tabler-icons-react';
import { IPost } from '../../contexts/post-provider/post-provider.interface';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';

/* eslint-disable-next-line */
export interface IVoteBarProps {
  onUpvote: (post: IPost) => void;
  post: IPost;
}

export function VoteBar({ onUpvote, post }: IVoteBarProps) {
  const { user } = useAuthContext();
  const voteExists = post?.upvote_ids.length > 0;
  const currentVote = user ? post?.upvote_ids?.includes(user?.id) : null;
  const upvoteUserNames = post?.expand?.upvote_ids?.map((user: IUser) => user);

  return (
    <Box>
      {voteExists && (
        <Group mb={10}>
          <Divider />
          <ThumbUp />
          <HoverCard>
            <HoverCard.Target>
              <UnstyledButton>{post?.upvote_ids.length}</UnstyledButton>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              {upvoteUserNames?.map((user: IUser) => (
                <Text key={user.id}>{user.name}</Text>
              ))}
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      )}
      <Divider mb={15} />
      <Flex justify="space-between">
        <Button
          px={50}
          color={currentVote ? 'blue' : 'gray'}
          onClick={() => onUpvote(post)}
        >
          <ThumbUp />
        </Button>
      </Flex>
    </Box>
  );
}

export default VoteBar;
