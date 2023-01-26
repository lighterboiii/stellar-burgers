import React from 'react';
import styles from './forgot-password.module.css';
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function ForgotPage() {
  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styles.form}>
        <EmailInput placeholder='Укажите Email'/>
        <Button type='primary' size='medium'>Восстановить</Button>
      </form>
      <div className={"mt-20 " + styles.wrapper}>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Вспомнили пароль?
         <a href="/login" className={styles.link}>Войти</a></p> {/* Поменять на Link*/}
      </div>
    </div>
  );
}