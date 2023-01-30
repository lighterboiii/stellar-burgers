import { useState } from 'react';
import styles from './register.module.css';
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
// import { registerUser } from '../../utils/api';
import { setRegistration } from '../../services/actions/user';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();
    // registerUser(email, password, name);
    dispatch(setRegistration(email, password, name));
    navigate('/profile');
  };

  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
      <form className={styles.form} onSubmit={onFormSubmit} >
        <Input type='text' name='name' value={name} placeholder='Имя' onChange={(e) => setName(e.target.value)} />
        <EmailInput type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type='primary' size='medium'>Зарегистрироваться</Button>
      </form>
      <div className={"mt-20 "}>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Уже зарегистрированы?
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </div>
  )
} 