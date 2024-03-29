import { ChangeEvent, FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import styles from './reset-password.module.css';
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordRequest } from '../../utils/api';
import { useSelector, useDispatch } from '../../services/hooks';
import { setForgotPassword } from '../../services/actions/userActions';

export const ResetPage: FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPasswordForgot } = useSelector((store) => store.userReducer);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordRequest(password, token);
    navigate('/login');
    dispatch(setForgotPassword(false));
  }

  useEffect(() => {
    if (!isPasswordForgot) {
      navigate('/forgot-password');
    };
  // eslint-disable-next-line
  }, [isPasswordForgot]);

  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <PasswordInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password} name='password' placeholder='Введите новый пароль' required />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
          value={token} name='token' type='text' placeholder='Введите код из письма' required />
        <Button htmlType='button' type='primary' size='medium'>Сохранить</Button>
      </form>
      <div className={"mt-20 "}>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Вспомнили пароль?
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </div>
  )
};