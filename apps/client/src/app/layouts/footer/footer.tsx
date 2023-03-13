import { Group, Text } from '@mantine/core';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <Group position="right">
      <Text size="xs">&copy; 2023 MemeKing</Text>
    </Group>
  );
}

export default Footer;
