import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import LinkItem from '../LinkItem/LinkItem.jsx';

import styles from './AppHeader.module.css';


function AppHeader() {
  const linkStyle = 'text text_type_main-default text_color_inactive mt-4 mb-4 pt-4 pb-4 pr-5 pl-5 ';

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.layout}>
          <LinkItem
            linkClass={linkStyle + styles.link}
            textClass={'ml-2 text_color_primary'}
            icon={<BurgerIcon type='primary' />}
            text={'Конструктор'}
            href={'#'}
          />
          <LinkItem
            linkClass={linkStyle + styles.link}
            textClass={'ml-2'}
            icon={<ListIcon type='secondary' />}
            text={'Лента заказов'}
            href={'#'}
          />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav className={styles.layout}>
          <LinkItem
            linkClass={linkStyle + styles.link}
            textClass={'ml-2'}
            icon={<ProfileIcon type='secondary'/>}
            text={'Личный кабинет'}
            href={'#'}
          />
        </nav>
      </nav>
    </header>
  );
};

export default AppHeader;