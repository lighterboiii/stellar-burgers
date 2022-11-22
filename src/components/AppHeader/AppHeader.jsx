import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import MenuItem from '../MenuItem/MenuItem.jsx';

import styles from './AppHeader.module.css';


function AppHeader() { 
  const linkStyle = 'text text_type_main-default text_color_inactive mt-4 mb-4 pt-4 pb-4 pr-5 mr-2'

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <nav className={styles.container}>
          <MenuItem
            linkClass={linkStyle + styles.link}
            textClass={'ml-2'}
            icon={<BurgerIcon type='secondary'/>}
            text={'Конструктор'}
          />
          <MenuItem
            linkClass={linkStyle + styles.link}
            textClass={'ml-2'}
            icon={<ListIcon type='secondary'/>}
            text={'Лента заказов'}
          />
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav className={styles.container}>
          <MenuItem
            linkClass={linkStyle + styles.link}
            textClass={'ml-2'}
            icon={<ProfileIcon type='secondary'/>}
            text={'Личный кабинет'}
          />
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;