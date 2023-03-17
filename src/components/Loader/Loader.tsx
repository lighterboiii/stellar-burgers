import styles from './Loader.module.css';
import { FC } from 'react';

interface ILoader {
  loading: boolean;
  error?: string;
  text?: string;
}

export const Loader: FC<ILoader> = ({ loading, error, text }) => {
  return (
    <>
      {loading && (
        <div className={styles.container}>
          <p className='text text_type_main-large'>Отправляем ваш заказ</p>
          <img
            src={`https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg`}
            alt="Анимация загрузки"
            className={styles.loader}
          />
        </div>
      )}
      {error && (
        <p className={'text text_type_main-large ' + styles.text}>{text}</p>
      )}
    </>
  );
};