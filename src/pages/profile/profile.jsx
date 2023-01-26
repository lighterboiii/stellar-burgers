import React from 'react';
import styles from './profile.module.css';
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function ProfilePage() {

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <div  className={styles.links + ' mb-20'}>
          <Link className={'text text_type_main-medium text_color_inactive ' + styles.proflink}>Профиль</Link>
          <Link className={'text text_type_main-medium text_color_inactive ' + styles.proflink}>История заказов</Link>
          <Link className={'text text_type_main-medium text_color_inactive ' + styles.proflink}>Выход</Link>
        </div>
        <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете
          изменить свои персональные данные</p>
      </nav>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <Input type='text' placeholder='Имя' required />
          <Input typ='text' placeholder='Логин' required />
          <PasswordInput  required />
        </form>
      </div>
    </div>
  )
} 