import { Paper, Textarea, Stack, Button } from '@mantine/core';
import { DropzoneButton } from '../../dropzone-button/dropzone-button';
import { useForm } from '@mantine/form';

/* eslint-disable-next-line */
export interface GroupEditFormProps {}

export function GroupEditForm(props: GroupEditFormProps) {
  const form = useForm();
  return (
    <Paper>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack align="stretch">
          <DropzoneButton />
          <Textarea
            label="About"
            description="Group description"
            placeholder="Write your group description"
            radius={15}
            minRows={2}
            mb={15}
            autosize
          ></Textarea>
          <Button fullWidth>Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default GroupEditForm;
