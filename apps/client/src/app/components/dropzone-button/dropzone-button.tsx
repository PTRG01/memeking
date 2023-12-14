import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';

import classes from './dropzone-button.module.css';
import { Download, X, CloudUpload } from 'tabler-icons-react';

export function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={() => ''}
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
            <Dropzone.Accept>Drop images here</Dropzone.Accept>
            <Dropzone.Reject>Jpg/Png file less than 5mb</Dropzone.Reject>
            <Dropzone.Idle>Upload image</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only{' '}
            <i>.jpg/.png</i> files that are less than 5mb in size.
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
          Select files
        </Button>
      </Group>
    </div>
  );
}
