import { Box, Button, Divider, MultiSelect, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import FloatingLabelInput from '../../floating-label-input/floating-label-input';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';

/* eslint-disable-next-line */
export interface GroupFormProps {}

export function GroupForm(props: GroupFormProps) {
  const [value, setValue] = useState<string[]>([]);
  const { handleSearch, followersSearchList, followingList } = useChatContext();
  const { createGroup } = useGroupContext();

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
  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) =>
          createGroup(values.title, values.groupUsers)
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
