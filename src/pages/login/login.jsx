import React from 'react';
import styles from './login.module.css';
import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Вход</h2>
      <form className={styles.form}>
        <EmailInput required />
        <PasswordInput required />
        <Button type='primary' size='medium'>Войти</Button>
      </form>
      <div className={"mt-20 " + styles.wrapper}>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Вы новый пользователь?
          <Link to="/register" className={styles.link}>Зарегистрироваться</Link> 
        </p>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link> 
        </p>
      </div>
    </div>
  );
}