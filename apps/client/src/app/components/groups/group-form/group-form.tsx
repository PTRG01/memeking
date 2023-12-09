import { Box, Button, Divider, MultiSelect, Stack } from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import FloatingLabelInput from '../../floating-label-input/floating-label-input';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface GroupFormProps {}

export function GroupForm(props: GroupFormProps) {
  const { followingList } = useChatContext();
  const { createGroup } = useGroupContext();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: '',
      groupUsers: [],
    },
  });

  const searchListdata = followingList
    ? followingList?.map(({ name: label, id: value }) => ({
        label,
        value,
      }))
    : [];

  const handleCreateGroup = (title: string, groupUsers: string[]) => {
    createGroup(title, groupUsers);
    navigate('/groups');
  };
  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) =>
          handleCreateGroup(values.title, values.groupUsers)
        )}
      >
        <Stack spacing={2}>
          <FloatingLabelInput
            label="Group name"
            placeholder=""
            {...form.getInputProps('title')}
          />
          <MultiSelect
            my={5}
            data={searchListdata}
            placeholder="Invite followers"
            searchable
            {...form.getInputProps('groupUsers')}
          />
          <Button type="submit" fullWidth>
            Create group
          </Button>
        </Stack>
      </form>
      <Divider />
    </Box>
  );
}

export default GroupForm;
