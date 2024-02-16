import {
  Avatar,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { createImageUrl } from '../../utils/image-url';

export interface IContentFormBarProps {
  onFormClick: () => void;
}

export function ContentFormBar({ onFormClick }: IContentFormBarProps) {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  return (
    <Stack align="stretch">
      <Paper radius={15} p={20} mb={10}>
        <Group noWrap mb={15}>
          <UnstyledButton>
            <Avatar
              radius={100}
              size="lg"
              src={
                user?.avatar && createImageUrl('users', user?.id, user.avatar)
              }
            />
          </UnstyledButton>
          <Button
            radius={50}
            variant="light"
            color="gray"
            fullWidth
            size="md"
            onClick={() => onFormClick()}
          >
            {t('contentFormBar.writeSomething')}
          </Button>
        </Group>
        <Divider mb={15} />
      </Paper>
    </Stack>
  );
}

export default ContentFormBar;
