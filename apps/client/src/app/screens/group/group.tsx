import { Container, Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import GroupContent from '../../components/groups/group-content/group-content';
import GroupHeader from '../../components/groups/group-header/group-header';
import { GroupWindowProvider } from '../../contexts/group-window-provider/group-window-provider';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';

export function Group() {
  const { groupId } = useParams();
  const { user } = useAuthContext();

  if (groupId === undefined) return null;
  if (groupId === 'create') return null;
  if (!user) return null;
  return (
    <Container>
      <GroupWindowProvider groupId={groupId}>
        <Stack align="stretch" maw={1000}>
          <GroupHeader user={user} groupId={groupId} />
          <GroupContent />
        </Stack>
      </GroupWindowProvider>
    </Container>
  );
}

export default Group;
