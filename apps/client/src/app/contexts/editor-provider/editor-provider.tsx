import React, {
  useCallback,
  useMemo,
  useState,
  useContext,
  useRef,
} from 'react';
import { v4 } from 'uuid';
import { ImageItem } from '../../components/image-object-form/image-object-form';
import { Actions, useMap } from 'usehooks-ts';
import { EditorDocument, Konva, ObjectScheme } from '../../types';

export interface EditorContext {
  onObjectClick: (id: string) => void;
  onRemove: () => void;
  onEditSubmit: (scheme: ObjectScheme) => void;
  onNewImage: () => void;
  onNewText: () => void;
  onEdit: () => void;
  focusedId: string;
  focusedObject?: ObjectScheme;
  actions: Actions<string, ObjectScheme>;
  objects: Omit<Map<string, ObjectScheme>, 'set' | 'clear' | 'delete'>;
  images: ImageItem[];
  setFocusedId: React.Dispatch<React.SetStateAction<string>>;
  focusedNodeRef: React.RefObject<Konva.Node | null>;
  onDocumentSubmit: (doc: EditorDocument) => void;
}

const defaultSize = {
  x: 0,
  y: 0,
};

const EditorContext = React.createContext<EditorContext | null>(null);

export interface EditorProviderProps extends React.PropsWithChildren {
  onDocumentSubmit: (doc: EditorDocument) => void;
  images: ImageItem[];
}

export function EditorProvider({
  children,
  onDocumentSubmit,
  images,
}: EditorProviderProps) {
  const [objects, actions] = useMap<string, ObjectScheme>(new Map());
  const [focusedId, setFocusedId] = useState<string>('');
  const focusedNodeRef = useRef<Konva.Node>(null);

  const focusedObject = useMemo(
    () => objects.get(focusedId),
    [focusedId, objects]
  );

  // TODO most of this actions could be moved to toolbar, since they are not necessary
  const onNewText = useCallback(() => {
    const id = v4();
    actions.set(id, {
      type: 'text',
      content: '',
      ...defaultSize,
    });

    setFocusedId(id);
  }, [actions]);

  const onNewImage = useCallback(() => {
    const id = v4();
    actions.set(id, {
      type: 'image',
      id: '',
      url: '',
      ...defaultSize,
    });

    setFocusedId(id);
  }, [actions]);

  const onEdit = useCallback(() => {
    console.log('onEdit action');
  }, []);

  const onRemove = useCallback(() => {
    actions.remove(focusedId);
  }, [actions, focusedId]);

  const onEditSubmit = useCallback(
    (newObj: ObjectScheme) => {
      actions.set(focusedId, newObj);
    },
    [actions, focusedId]
  );

  const onObjectClick = useCallback((id: string) => {
    setFocusedId(id);
  }, []);

  const value = useMemo(
    () => ({
      images,
      onObjectClick,
      onRemove,
      onEditSubmit,
      onNewImage,
      onNewText,
      onEdit,
      setFocusedId,
      focusedId,
      focusedObject,
      actions,
      objects,
      focusedNodeRef,
      onDocumentSubmit,
    }),
    [
      actions,
      focusedId,
      focusedObject,
      images,
      objects,
      onDocumentSubmit,
      onEdit,
      onEditSubmit,
      onNewImage,
      onNewText,
      onObjectClick,
      onRemove,
    ]
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export const useEditorContext = () => {
  const data = useContext(EditorContext);

  if (!data) {
    throw Error('useEditorContext should be used inside of EditorProvider');
  }

  return data;
};

export default EditorProvider;
