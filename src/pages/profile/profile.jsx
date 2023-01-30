import styles from './profile.module.css';
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

export function ProfilePage() {

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <div className={styles.links + ' mb-20'}>
          <NavLink className={({ isActive }) => isActive ? `${styles.profLink} text text_type_main-medium text_color_primary`
            : `${styles.profLink} text text_type_main-medium text_color_inactive`} to='/profile'>
            Профиль
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${styles.profLink} text text_type_main-medium text_color_primary`
            : `${styles.profLink} text text_type_main-medium text_color_inactive`} to='/profile/orders'>
            История заказов
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${styles.profLink} text text_type_main-medium text_color_primary`
            : `${styles.profLink} text text_type_main-medium text_color_inactive`} to='/profile/orders/:id'>
            Выход
          </NavLink>
        </div>
        <p className='text text_type_main-default text_color_inactive'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <Input type='text' placeholder='Имя' required />
          <Input type='text' placeholder='Логин' required />
          <PasswordInput type='password' required />
        </form>
      </div>
    </div>
  )
} 