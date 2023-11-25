import {
  Box,
  Button,
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
  const commentExists = post?.comment_ids.length > 0;
  const voteActive = user ? post?.upvote_ids?.includes(user?.id) : null;
  const upvoteUsers = post?.expand?.upvote_ids?.map((user: IUser) => user);
  // TODO ADD INTERFACE FOR COMMENTS
  const commentUsers = post?.expand?.comment_ids?.map(
    (comment) => comment?.expand?.author_id
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={15}>
        {voteExists && (
          <Group>
            <Divider />
            <HoverCard>
              <HoverCard.Target>
                <UnstyledButton>
                  <Flex>
                    <ThumbUp />
                    <Text> {post?.upvote_ids.length}</Text>
                  </Flex>
                </UnstyledButton>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                {upvoteUsers?.map((user: IUser) => (
                  <Text key={user.id}>{user.name}</Text>
                ))}
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        )}
        {commentExists && (
          <HoverCard>
            <HoverCard.Target>
              <UnstyledButton>
                {post?.comment_ids?.length > 1
                  ? `${post?.comment_ids?.length} comments`
                  : `${post?.comment_ids?.length} comment`}
              </UnstyledButton>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              {commentUsers?.map((user: IUser) => (
                <Text key={user.id}>{user.name}</Text>
              ))}
            </HoverCard.Dropdown>
          </HoverCard>
        )}
      </Flex>
      <Divider mb={15} />
      <Flex justify="space-between">
        <Button
          px={50}
          color={voteActive ? 'blue' : 'gray'}
          onClick={() => onUpvote(post)}
        >
          <ThumbUp />
        </Button>
      </Flex>
    </Box>
  );
}

export default VoteBar;
