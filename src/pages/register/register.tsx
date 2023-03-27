import { useState, FormEvent, FC, ChangeEvent } from 'react';
import styles from './register.module.css';
import { IUserData } from '../../services/actions/userActions';
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from '../../services/hooks';
import { setRegistration } from '../../services/actions/userActions';

export const RegisterPage: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, accessToken } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setRegistration(email, password, name));
    navigate('/profile');
  };
 
  return (
    (user && accessToken) ? <Navigate to='/' /> :
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
      <form className={styles.form} onSubmit={onFormSubmit} >
        <Input type='text' name='name' value={name} placeholder='Имя' onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        <EmailInput name='email' value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <PasswordInput name='password' value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        <Button htmlType='submit' type='primary' size='medium'>Зарегистрироваться</Button>
      </form>
      <div className={"mt-20 "}>
        <p className={'text text_type_main-default text_color_inactive ' + styles.text}>Уже зарегистрированы?
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </div> 
  )
};