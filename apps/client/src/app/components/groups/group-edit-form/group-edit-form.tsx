import { Paper, Textarea, Stack, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { useTranslation } from 'react-i18next';

export interface IGroupEditFormProps {
  group: IGroup;
  onSubmitAbout: (aboutText: string | null) => void;
}

export function GroupEditForm({ group, onSubmitAbout }: IGroupEditFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      aboutText: group?.aboutText,
      avatar: group?.avatar,
    },
  });

  return (
    <Paper>
      <form
        onSubmit={form.onSubmit((values) =>
          onSubmitAbout(values.aboutText as string)
        )}
      >
        <Stack align="stretch">
          <Textarea
            label="About"
            description="Group description"
            placeholder="Write your group description"
            radius={15}
            minRows={2}
            mb={15}
            autosize
            {...form.getInputProps('aboutText')}
          ></Textarea>
          <Button fullWidth type="submit">
            {t('groups.submitDescription')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
export default GroupEditForm;
