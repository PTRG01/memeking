import { TextInput, Flex, Button, List, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUserList } from '../../hooks/pb-utils';
import UserListItem from '../../components/user-list-item/user-list-item';
import { Search } from 'tabler-icons-react';
import { useCallback, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { TUserModel } from '../../contexts/auth-provider/auth-provider.interface';
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
  onInputUsed?: () => void;
}

export function UserSearch({
  onAddUser,
  onRemoveUser,
  values,
  loading,
  hideExisting,
  onInputUsed,
}: IUserSearch) {
  const { user } = useAuthContext();
  const { getList, searchList } = useChatContext();
  const { t, i18n } = useTranslation();

  const filterQueryResult = (currentUser: TUserModel) =>
    !hideExisting
      ? searchList?.filter((user) => user?.id !== currentUser?.id)
      : searchList?.filter(
          (user) => user.id !== currentUser?.id && !values.includes(user.id)
        );

  const filteredUsers = filterQueryResult(user);
  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  const handleSearch = useCallback((value: string) => {
    if (value.length >= 3) {
      getList({
        queryParams: { filter: `name~"${value}"` },
      });
      onInputUsed();
    }
  }, []);

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
        {searchList && form.values.search.length >= 3
          ? filteredUsers?.map((item) => (
              <UserListItem
                label={item.name}
                avatar={item.avatar}
                id={item.id}
                key={item.id}
                onAddValue={onAddUser}
                onRemoveValue={onRemoveUser}
                values={values}
                loading={loading}
              />
            ))
          : null}
      </List>
    </Group>
  );
}

export default UserSearch;
