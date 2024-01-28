import { useRef, useState } from 'react';
import {
  Text,
  Group,
  Button,
  rem,
  useMantineTheme,
  Image,
  Modal,
} from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';

import styles from './dropzone-button.module.css';
import { Download, X, CloudUpload } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';

export interface IDopzoneButtonProps {
  onSubmit: (images: FileWithPath[]) => void;
  isOpen: boolean;
  onOpen: (value: boolean) => void;
}

export function DropzoneButton({
  onSubmit,
  isOpen,
  onOpen,
}: IDopzoneButtonProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const { t } = useTranslation();
  const [images, setImages] = useState<FileWithPath[] | null>(null);

  const handleOnDrop = (images: FileWithPath[]) => {
    setImages(images);
  };
  const handleSubmit = () => {
    if (images) {
      console.log(images);
      onSubmit(images);
      onOpen(false);
      setImages(null);
    }
  };

  const handleClose = () => {
    onOpen(false);
    setImages(null);
  };

  return (
    <Modal opened={isOpen} onClose={() => handleClose()}>
      <div className={styles.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={(e) => handleOnDrop(e)}
          className={styles.dropzone}
          radius="md"
          mb={10}
          accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
          maxSize={5 * 1024 ** 2}
          maxFiles={1}
        >
          {images ? (
            <Image src={URL.createObjectURL(images[0])} />
          ) : (
            <div style={{ pointerEvents: 'none' }}>
              <Group position="center">
                <Dropzone.Accept>
                  <Download
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.blue[6]}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <X
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.red[5]}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <CloudUpload style={{ width: rem(50), height: rem(50) }} />
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
          )}
        </Dropzone>
        <Group position="center" mb={35}>
          <Button
            className={styles.control}
            size="md"
            radius="xl"
            onClick={() => openRef.current?.()}
          >
            {t('dropzone.select')}
          </Button>
        </Group>
        <Button fullWidth type="submit" onClick={() => handleSubmit()}>
          {t('groups.submitImage')}
        </Button>
      </div>
    </Modal>
  );
}
