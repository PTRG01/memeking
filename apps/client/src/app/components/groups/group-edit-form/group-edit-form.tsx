import { Paper, Textarea, Stack, Button } from '@mantine/core';
import { DropzoneButton } from '../../dropzone-button/dropzone-button';
import { useForm } from '@mantine/form';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { useEffect, useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { useTranslation } from 'react-i18next';
import { pb } from '../../../utils/pocketbase';

/* eslint-disable-next-line */
export interface IGroupEditFormProps {
  group: IGroup;
  onSubmitAbout: (aboutText: string | null) => void;
  onSubmitImage: (image: FileWithPath) => void;
}

export function GroupEditForm({
  group,
  onSubmitAbout,
  onSubmitImage,
}: IGroupEditFormProps) {
  const [image, setImage] = useState<FileWithPath[] | null>(null);
  const { t } = useTranslation();
  const formData = new FormData();

  const form = useForm({
    initialValues: {
      aboutText: group?.aboutText,
      avatar: group?.avatar,
    },
  });

  const handleImageSubmit = (file: FileWithPath) => {
    console.log(file);
    formData.append('group_image', file);
  };
  useEffect(() => {
    console.log(image);
  }, [image]);
  const handleImageUpload = () => {
    pb.collection('groups').create(image?.[0]);
  };
  const handleImageUpload2 = () => {
    onSubmitImage(image);
  };
  return (
    <Paper>
      <Stack mb={15}>
        <DropzoneButton onSubmit={setImage} />
        <Button fullWidth onClick={() => onSubmitImage(formData)}>
          {t('groups.submitImage')}
        </Button>
      </Stack>
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
