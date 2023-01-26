import React from 'react';
import styles from './register.module.css';
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
      <form className={styles.form}>
        <Input type='text' placeholder='Имя' required />
        <EmailInput required />
        <PasswordInput required />
        <Button type='primary' size='medium'>Зарегистрироваться</Button>
      </form>
      <div className={"mt-20 "}>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Уже зарегистрированы?
          <Link to="/login" className={styles.link}>Войти</Link> {/* Поменять на Link*/}
        </p>
      </div>
    </div>
  )
} 