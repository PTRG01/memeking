import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';

import classes from './dropzone-button.module.css';
import { Download, X, CloudUpload } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';

export interface IDopzoneButtonProps {
  onSubmit: Dispatch<SetStateAction<FormData>>;
}

export function DropzoneButton({ onSubmit }: IDopzoneButtonProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [formData, setFormData] = useState(new FormData());
  const { t } = useTranslation();

  const handleOnDrop = (e: FileWithPath[]) => {
    const newFormData = new FormData();
    newFormData.append('documents ', e[0]);
    setFormData(newFormData);
    onSubmit(newFormData);
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={(e) => handleOnDrop(e)}
        className={classes.dropzone}
        radius="md"
        mb={10}
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxSize={5 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <Download
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke="md"
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <X
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke="md"
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <CloudUpload
                style={{ width: rem(50), height: rem(50) }}
                stroke="md"
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept> {t('dropzone.drop')}</Dropzone.Accept>
            <Dropzone.Reject>{t('dropzone.files')}</Dropzone.Reject>
            <Dropzone.Idle>{t('dropzone.upload')}</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            {t('dropzone.drag1')}&apos;n&apos;{t('dropzone.drag2')}
            <i>.jpg/.png</i> {t('dropzone.drag3')}
          </Text>
        </div>
      </Dropzone>
      <Group position="center" mb={25}>
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          {t('dropzone.select')}
        </Button>
      </Group>
    </div>
  );
}
