import { Image, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { ImageScheme, ObjectScheme } from '../../types';

export interface ImageItem {
  url: string;
  id: string;
}

export interface ImageObjectFormProps {
  onSubmit: (values: ObjectScheme) => void;
  images: ImageItem[];
  object: ImageScheme;
}

export function ImageObjectForm({
  onSubmit,
  images = [],
  object,
}: ImageObjectFormProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem>({
    id: object.id,
    url: object.url,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!selectedImage) return;
        onSubmit({
          ...object,
          ...selectedImage,
        });
      }}
    >
      {images.map((item) => (
        <Image
          key={item.url}
          src={item.url}
          onClick={() => setSelectedImage(item)}
        />
      ))}

      <Group mt={6}>
        <Button type="submit">Add to meme</Button>
      </Group>
    </form>
  );
}

export default ImageObjectForm;
