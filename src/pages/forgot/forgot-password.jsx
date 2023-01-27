import React, { useCallback } from 'react';
import styles from './forgot-password.module.css';
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setForgotPasswordValue, postForgotPasswordEmail } from '../../services/actions/forgot';

export function ForgotPage() {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.form);

  const onFormChange = (e) => {
    dispatch(setForgotPasswordValue(e.target.name, e.target.value));
  };

  const onFormSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(postForgotPasswordEmail(email))
  })

  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styles.form}>
        <EmailInput placeholder='Укажите Email' type='email' name='email' value={email} onChange={onFormChange} />
        <Button type='primary' size='medium' onClick={onFormSubmit}>
          <Link className={styles.buttonLink} to='/reset-password'>
            Восстановить
          </Link>
        </Button>
      </form>
      <div className={"mt-20 " + styles.wrapper}>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Вспомнили пароль?
          <Link to="/login" className={styles.link}>Войти</Link></p>
      </div>
    </div>
  );
}