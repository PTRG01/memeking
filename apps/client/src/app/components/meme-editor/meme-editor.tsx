import styles from './meme-editor.module.css';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import EditorToolbar from '../editor-toolbar/editor-toolbar';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group } from '@mantine/core';
import TextObjectForm from '../text-object-form/text-object-form';
import ImageObjectForm from '../image-object-form/image-object-form';
import EditorObject from '../editor-object/editor-object';
import { useEditorContext } from '../../contexts/editor-provider/editor-provider';
import { Konva } from '../../types';

/* eslint-disable-next-line */
export interface MemeEditorProps {}

export function MemeEditor(props: MemeEditorProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    onEditSubmit,
    focusedObject,
    objects,
    images,
    onDocumentSubmit,
    focusedId,
    setFocusedId,
  } = useEditorContext();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(() => {
    setFocusedId('');
    setIsSubmitting(true);
  }, [setFocusedId]);

  useEffect(() => {
    if (stageRef.current && isSubmitting && !focusedId) {
      setIsSubmitting(false);
      const data = stageRef.current.toDataURL();

      onDocumentSubmit({
        objects: Array.from(objects.values()),
        image: data ?? '',
      });
    }
  }, [isSubmitting, focusedId, onDocumentSubmit, objects]);

  return (
    <div className={styles['container']}>
      <EditorToolbar openModal={open} onSubmit={onSubmit} />
      <Modal
        opened={opened}
        onClose={close}
        title="Come on! Think about something funny..."
      >
        {focusedObject?.type === 'text' && (
          <TextObjectForm object={focusedObject} onSubmit={onEditSubmit} />
        )}
        {focusedObject?.type === 'image' && (
          <ImageObjectForm
            object={focusedObject}
            onSubmit={onEditSubmit}
            images={images}
          />
        )}
      </Modal>
      <Group ref={rootRef} bg="white" mt={8}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Stage ref={stageRef} width={window.innerWidth} height={600}>
          <Layer>
            {Array.from(objects.entries()).map(([id, object]) => (
              <EditorObject key={id} object={object} id={id} />
            ))}
          </Layer>
        </Stage>
      </Group>
    </div>
  );
}

export default MemeEditor;
