import { FileWithPath } from '@mantine/dropzone';

export const createImageUrl = (
  collection: string,
  itemId: string | null,
  imageId: FileWithPath | string
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return `${import.meta.env.VITE_FILES_URL}/${collection}/${itemId}/${imageId}`;
};
