import { TextInput, Flex, Button, List, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import UserListItem from '../user-list-item/user-list-item';
import { Search } from 'tabler-icons-react';
import { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */

export interface IUserSearch {
  onAddUser: (value: string) => void;
  onRemoveUser: (value: string) => void;
  values: string[];
  loading: boolean;
  hideExisting: boolean;
}

export function UserSearch({
  onAddUser,
  onRemoveUser,
  values,
  loading,
  hideExisting,
}: IUserSearch) {
  const { handleSearch, searchList } = useChatContext();
  const { t, i18n } = useTranslation();

  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  useEffect(() => {
    handleSearch(form.values.search);
  }, [form.values.search]);

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
      <List mt="lg" size="sm" w="100%">
        {searchList?.map((item) => (
          <UserListItem
            card={false}
            label={item.name}
            avatar={item.avatar}
            id={item.id}
            key={item.id}
            onAddValue={onAddUser}
            onRemoveValue={onRemoveUser}
            values={values}
            loading={loading}
          />
        ))}
      </List>
    </Group>
  );
}

export default UserSearch;
