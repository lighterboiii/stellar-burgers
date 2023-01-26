import React from 'react';
import styles from './login.module.css';

export function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className='text'>Вход</h1>
      </form>
    </div>
  );
}