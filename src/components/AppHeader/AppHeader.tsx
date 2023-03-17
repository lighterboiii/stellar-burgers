import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { NavLink, Link, useMatch } from "react-router-dom";
import styles from './AppHeader.module.css';


function AppHeader() {
  const linkStyleee = 'text text_type_main-default text_color_primary mt-4 mb-4 pt-4 pb-4 pr-5 pl-5 ';
  const linkStyle = {
    color: "#f2f2f3",

  }

  const matchHome = useMatch('/');
  const matchList = useMatch('/feed');
  const matchProfile = useMatch('/profile');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.layout}>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? linkStyle : undefined)}
            className={`text text_type_main-default ${styles.link}`}
          >
            <BurgerIcon type={Boolean(matchHome) ? 'primary' : 'secondary'} />
            Конструктор
          </NavLink>
          <NavLink
            to='/feed'
            style={({ isActive }) => (isActive ? linkStyle : undefined)}
            className={`text text_type_main-default ${styles.link}`}>
            <ListIcon type={Boolean(matchList) ? 'primary' : 'secondary'} />
            Лента заказов</NavLink>
          <div className={styles.logo}>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <NavLink
            to='/profile'
            style={({ isActive }) => (isActive ? linkStyle : undefined)}
            className={`text text_type_main-default ${styles.link}`}>
            <ProfileIcon type={Boolean(matchProfile) ? 'primary' : 'secondary'} />
            Личный кабинет</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;