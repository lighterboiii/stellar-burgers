import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import MenuItem from '../MenuItem/MenuItem.jsx';
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

import styles from './AppHeader.module.css';


function AppHeader() {
    return (
<header className={styles.header}>
  <div className={styles.content}>
    <nav className={styles.container}>
      <MenuItem
        linkClass={styles.link}
        textClass={styles.text}
        icon={<BurgerIcon />}
        text={'Конструктор'}
      />
       <MenuItem
        linkClass={styles.link}
        textClass={styles.text}
        icon={<ListIcon />}
        text={'Лента заказов'}
     /> 
    </nav>
    <div>
      <Logo />
    </div>
    <div className={styles.container}>
      <div className={styles.menuItem}><ProfileIcon />Личный кабинет</div> {/* Заменить на компонент */}
    </div>
  </div>
</header>
    );
};

export default AppHeader;