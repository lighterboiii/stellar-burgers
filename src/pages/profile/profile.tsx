import styles from './profile.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet, useLocation, useMatch } from "react-router-dom";
import { FC, useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { setLogout, sendUserInfo, IUser } from '../../services/actions/userActions';
import { getCookie } from '../../utils/cookie';

export const ProfilePage: FC = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  const accessToken = getCookie("accessToken");
  const { user } = useSelector((store) => store.userReducer);
  const [userData, setUserData] = useState<IUser>(user!);
  const [passwordValue, setPasswordValue] = useState('');

  const passRef = useRef<HTMLInputElement>(null);

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeout(() => passRef.current?.focus(), 0);
    setPasswordValue(value);
  }

  const handleLogout = () => {
    const refreshToken = getCookie("refreshToken");
    dispatch(setLogout(refreshToken));
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendUserInfo(userData!.name, userData!.email, passwordValue, accessToken));
  }

  const handleCancel = () => {
    setUserData({ name: user!.name, email: user!.email })
    setPasswordValue(passwordValue);
  }

  const matchOrders = useMatch('/profile/orders');
  const matchProfile = useMatch('/profile');

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <div className={styles.links + ' mb-20'}>
          <NavLink className={Boolean(matchProfile) ? `${styles.profLink} text text_type_main-medium text_color_primary`
            : `${styles.profLink} text text_type_main-medium text_color_inactive`} to='/profile'>
            Профиль
          </NavLink>
          <NavLink className={Boolean(matchOrders) ? `${styles.profLink} text text_type_main-medium text_color_primary`
            : `${styles.profLink} text text_type_main-medium text_color_inactive`} to='orders'>
            История заказов
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${styles.profLink} text text_type_main-medium text_color_primary`
            : `${styles.profLink} text text_type_main-medium text_color_inactive`} onClick={handleLogout} to='/login'>
            Выход
          </NavLink>
        </div>
        <p className='text text_type_main-default text_color_inactive'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={styles.wrapper}>
        {location.pathname === '/profile/orders' ? <Outlet /> :
          <form className={styles.form} onSubmit={onFormSubmit} name="profile">
            <Input type='text' name='name' placeholder='Имя' icon={'EditIcon'}
              value={userData!.name} onChange={onFormChange} />
            <Input type='email' name='email' placeholder='Логин' icon={'EditIcon'}
              value={userData!.email} onChange={onFormChange} />
            <PasswordInput name='password' placeholder='Пароль' value={passwordValue} onChange={onPassChange} />
            {
                <div className={styles.buttons}>
                  <Button type='secondary' size='medium' htmlType='button' onClick={handleCancel}>Отмена</Button>
                  <Button type='primary' size='medium' htmlType='submit' >Сохранить</Button>
                </div>
            }
          </form>
        }
      </div>
    </div>
  )
};