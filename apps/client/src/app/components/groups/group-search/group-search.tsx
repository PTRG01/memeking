import { Paper, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'tabler-icons-react';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import GroupList from '../group-list/group-list';

/* eslint-disable-next-line */
export interface IGroupSearchProps {}

export function GroupSearch(props: IGroupSearchProps) {
  const { user } = useAuthContext();
  const { t, i18n } = useTranslation();
  const { searchGroup, groupSearchListResult } = useGroupContext();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      search: '',
    },
  });
  const notJoinedGroups = user
    ? groupSearchListResult?.filter((group) => !group.users.includes(user?.id))
    : null;

  useEffect(() => {
    searchGroup(form.values.search);
  }, [form.values.search, searchGroup]);

  const handleGroupItemClick = (groupId: string) => {
    console.log('click');
    navigate(`/groups/search/${groupId}`);
  };

  return (
    <Stack spacing={0}>
      <Stack align="stretch" spacing={0}>
        <form
          onSubmit={form.onSubmit((values) => {
            searchGroup(values.search);
          })}
        >
          <TextInput icon={<Search />} {...form.getInputProps('search')} />
        </form>
      </Stack>
      {notJoinedGroups ? (
        <Paper withBorder>
          <GroupList
            groupList={notJoinedGroups}
            onItemClick={handleGroupItemClick}
          />
        </Paper>
      ) : null}
    </Stack>
  );
}

export default GroupSearch;
