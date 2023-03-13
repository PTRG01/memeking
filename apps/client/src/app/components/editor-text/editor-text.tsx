import React from 'react';
import { Text } from 'react-konva';
import { Konva, TextScheme } from '../../types';

export interface EditorTextProps {
  object: TextScheme;
}

const EditorText = React.forwardRef(
  ({ object, ...rest }: EditorTextProps, ref: React.Ref<Konva.Text>) => {
    return (
      <Text
        {...object}
        text={object.content}
        fill="white"
        stroke="black"
        fontSize={40}
        draggable
        fontFamily="Roboto"
        ref={ref}
        {...rest}
      />
    );
  }
);

export default EditorText;
