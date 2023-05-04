import {
  TextInput,
  Flex,
  Button,
  Container,
  List,
  NavLink,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUserList } from '../../hooks/pb-utils';
import UserListItem from '../../components/user-list-item/user-list-item';
import { Search } from 'tabler-icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useToggle } from '@mantine/hooks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {
  TUserModel,
  useAuthContext,
} from '../../contexts/auth-provider/auth-provider';
/* eslint-disable-next-line */

export interface ISearchBarProps {
  onAddUser: (value: string) => void;
  onRemoveUser: (value: string) => void;
  values: string[];
  loading: boolean;
}

export function UserSearch({
  onAddUser,
  onRemoveUser,
  values,
  loading,
}: ISearchBarProps) {
  const { getList, result } = useUserList();
  const { user } = useAuthContext();

  const filterQueryResult = (currentUser: TUserModel) => {
    return result?.filter((user) => {
      return user.id !== currentUser?.id;
    });
  };
  const filteredUsers = filterQueryResult(user);
  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  useEffect(() => {
    handleSearch(form.values.search);
  }, [form.values.search]);

  const handleSearch = useCallback((value: string) => {
    if (value.length >= 3) {
      getList({
        queryParams: { filter: `name~"${value}"` },
      });
    }
  }, []);

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
            <Button type="submit">Search</Button>
          </Flex>
        </form>
      </Group>
      <List mt="lg" size="sm" w="100%">
        {result && form.values.search.length >= 3
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
