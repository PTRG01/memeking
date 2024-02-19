import {
  TextInput,
  Flex,
  Button,
  List,
  Group,
  Popover,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Search } from 'tabler-icons-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface IUserSearch {
  handleSearch: (value: string) => void;
  children: React.ReactElement;
}

export function UserSearch({ handleSearch, children }: IUserSearch) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  useEffect(() => {
    handleSearch(form.values.search);
  }, [form.values.search, handleSearch]);

  return (
    <Group>
      <Group>
        <form
          onSubmit={form.onSubmit((values) => {
            handleSearch(values.search);
          })}
        >
          <Flex gap="sm">
            <TextInput icon={<Search />} {...form.getInputProps('search')} />
            <Button type="submit">{t('search.search')}</Button>
          </Flex>
        </form>
      </Group>
      <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Button variant="subtle" color="red" fullWidth>
            Click here for user list!
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="sm">
            John Doe, Jane Smith, Charlie Brown, Alice Johnson, Bob Williams,
            Emily Davis, Michael Lee, Susan Clark, David Miller, Sarah Wilson,
            Mark Turner, Laura White, Kevin Parker, Olivia Adams, Chris Young,
            Anna Moore, Steven Hill, Mia Turner, Alex Foster, Eva Davis, Ryan
            Brown, Emma Reed, Andrew Taylor, Lily Wright, Daniel Hill, Grace
            Turner, Nathan Carter, Julia White, Brandon Moore, Isabella Clark,
            Jack Davis
          </Text>
        </Popover.Dropdown>
      </Popover>
      <List size="sm" w="100%">
        {children}
      </List>
    </Group>
  );
}

export default UserSearch;
