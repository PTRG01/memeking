import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { ImageScheme, Konva } from '../../types';

export interface EditorImageProps {
  object: ImageScheme;
}

const EditorImage = React.forwardRef(
  ({ object, ...rest }: EditorImageProps, ref: React.Ref<Konva.Image>) => {
    const [image] = useImage(object.url, 'anonymous');

    return <Image ref={ref} image={image} draggable {...rest} />;
  }
);

export default EditorImage;
