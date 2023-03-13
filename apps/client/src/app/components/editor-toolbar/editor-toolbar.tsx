import { Group, Button } from '@mantine/core';
import { over } from 'lodash';
import {
  Photo,
  TextRecognition,
  Edit,
  Trash,
  ArrowUp,
  ArrowDown,
  Check,
} from 'tabler-icons-react';
import { useEditorContext } from '../../contexts/editor-provider/editor-provider';
import styles from './editor-toolbar.module.css';

export interface EditorToolbarProps {
  openModal: () => void;
  onSubmit: () => void;
}

export function EditorToolbar({ openModal, onSubmit }: EditorToolbarProps) {
  const {
    onNewImage,
    onNewText,
    onEdit,
    onRemove,
    focusedObject,
    focusedNodeRef,
  } = useEditorContext();

  return (
    <div className={styles['container']}>
      <Group>
        <Button variant="subtle" radius="lg" size="xs" onClick={onSubmit}>
          <Check />
        </Button>
        {onNewImage && (
          <Button
            variant="subtle"
            radius="lg"
            size="xs"
            onClick={over([openModal, onNewImage])}
          >
            <Photo />
          </Button>
        )}
        {onNewText && (
          <Button
            variant="subtle"
            radius="lg"
            size="xs"
            onClick={over([openModal, onNewText])}
          >
            <TextRecognition />
          </Button>
        )}
        {onEdit && (
          <Button
            variant="subtle"
            radius="lg"
            size="xs"
            onClick={over([openModal, onEdit])}
          >
            <Edit />
          </Button>
        )}
        {onRemove && (
          <Button
            variant="subtle"
            radius="lg"
            onClick={onRemove}
            size="xs"
            disabled={!focusedObject}
          >
            <Trash />
          </Button>
        )}
        <Button
          variant="subtle"
          radius="lg"
          onClick={() => {
            if (focusedNodeRef.current) {
              focusedNodeRef.current.moveUp();
            }
          }}
          size="xs"
          disabled={!focusedNodeRef.current}
        >
          <ArrowUp />
        </Button>
        <Button
          variant="subtle"
          radius="lg"
          onClick={() => {
            if (focusedNodeRef.current) {
              focusedNodeRef.current.moveDown();
            }
          }}
          size="xs"
          disabled={!focusedNodeRef.current}
        >
          <ArrowDown />
        </Button>
      </Group>
    </div>
  );
}

export default EditorToolbar;
