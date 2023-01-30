import { useState } from 'react';
import styles from './reset-password.module.css';
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { resetPasswordRequest } from '../../utils/api';

export function ResetPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    
    resetPasswordRequest(password, token)
  }

  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <PasswordInput onChange={(e) => setPassword(e.target.value)} value={password} name='password' placeholder='Введите новый пароль' required />
        <Input onChange={(e) => setToken(e.target.value)} value={token} name='token' type='text' placeholder='Введите код из письма' required />
        <Button type='primary' size='medium'>Сохранить</Button>
      </form>
      <div className={"mt-20 "}>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Вспомнили пароль?
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </div>
  )
} 