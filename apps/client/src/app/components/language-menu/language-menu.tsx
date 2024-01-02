import { useState } from 'react';
import styles from './language-menu.module.css';
import { Group, Menu, UnstyledButton } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';

interface IData {
  label: string;
  image: JSX.Element;
  lng: string;
}
const data = [
  {
    label: 'English',
    image: <ReactCountryFlag countryCode="US" svg />,
    lng: 'en',
  },
  {
    label: 'German',
    image: <ReactCountryFlag countryCode="DE" svg />,
    lng: 'de',
  },
  {
    label: 'Italian',
    image: <ReactCountryFlag countryCode="IT" svg />,
    lng: 'it',
  },
  {
    label: 'French',
    image: <ReactCountryFlag countryCode="FR" svg />,
    lng: 'fr',
  },
  {
    label: 'Polish',
    image: <ReactCountryFlag countryCode="PL" svg />,
    lng: 'pl',
  },
];

export function LanguageMenu() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);
  const { t, i18n } = useTranslation();

  const handleItemClick = (item: IData) => {
    setSelected(item);
    i18n.changeLanguage(item.lng);
  };

  const items = data.map((item) => (
    <Menu.Item
      icon={item.image}
      onClick={() => handleItemClick(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
      shadow="sm"
    >
      <Menu.Target>
        <UnstyledButton
          className={styles.control}
          data-expanded={opened || undefined}
        >
          <Group spacing="xs" align="center" mr={15}>
            {selected.image}
            <span className={styles.label}>{selected.label}</span>
          </Group>
          <ChevronDown size={20} className={styles.icon} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}

export default LanguageMenu;
