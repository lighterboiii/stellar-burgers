import React, { useCallback } from 'react';
import styles from './reset-password.module.css';
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setResetPasswordForm } from '../../services/actions/reset';
import { postResetPasswordRequest } from '../../services/actions/reset';

export function ResetPage() {
  const dispatch = useDispatch();
  const password  = useSelector((state) => state.form);
  const token  = useSelector((state) => state.form);

  const onChange = (e) => {
    dispatch(setResetPasswordForm(e.target.name, e.target.value))
  };

  const onFormSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(postResetPasswordRequest(password, token))
  }, [password, token]);

  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styles.form}>
        <PasswordInput onChange={onChange} value={password} name='password' placeholder='Введите новый пароль' required/>
        <Input onChange={onChange} value={token} name='token' type='text' placeholder='Введите код из письма' required/>
        <Button type='primary' size='medium' onClick={onFormSubmit}>Сохранить</Button>
      </form>
      <div className={"mt-20 "}>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Вспомнили пароль?
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </div>
  )
} 