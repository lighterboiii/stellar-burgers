import styles from './profile.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate, Outlet, useMatch } from "react-router-dom";
import { FC, useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { setLogout, sendUserInfo } from '../../services/actions/userActions';
import { getCookie } from '../../utils/cookie';
import { getUserInfo } from '../../services/actions/userActions';

export const ProfilePage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = getCookie("accessToken");
  const user = useSelector((store) => store.userReducer.user);

  useEffect(() => {
    if (user) {
      setNameValue(user.name);
      setEmailValue(user.email);
      setPasswordValue(passwordValue);
    } else {
      dispatch(getUserInfo());
      navigate('/profile', { replace: true })
    }
  }, [user])

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isInfoChanged, setIsInfoChanged] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const matchOrders = useMatch('/profile/orders');
  const matchProfile = useMatch('/profile');

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeout(() => nameRef.current?.focus(), 0);
    setNameValue(value);
    value === user!.name ? setIsInfoChanged(false) : setIsInfoChanged(true);
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeout(() => emailRef.current?.focus(), 0);
    setEmailValue(value);
    value === user!.email ? setIsInfoChanged(false) : setIsInfoChanged(true);
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
    dispatch(sendUserInfo(nameValue, emailValue, passwordValue, accessToken));
  }

  const handleCancel = () => {
    setNameValue(user!.name);
    setEmailValue(user!.email);
    setPasswordValue(passwordValue);
    setIsInfoChanged(false);
  }

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
        {Boolean(matchOrders) ? <Outlet /> :
          <form className={styles.form} onSubmit={onFormSubmit} name="profile">
            <Input type='text' name='name' placeholder='Имя' icon={'EditIcon'}
              value={nameValue} ref={nameRef} onChange={onNameChange} />
            <Input type='email' name='login' placeholder='Логин' icon={'EditIcon'}
              value={emailValue} ref={emailRef} onChange={onEmailChange} />
            <PasswordInput name='password' value={passwordValue} onChange={onPassChange} />
            {
              isInfoChanged && (
                <div className={styles.buttons}>
                  <Button type='secondary' size='medium' htmlType='button' onClick={handleCancel}>Отмена</Button>
                  <Button type='primary' size='medium' htmlType='submit' >Сохранить</Button>
                </div>
              )
            }
          </form>
 }
      </div>
    </div>
  )
};