import styles from './OrdersCounter.module.css';
import { FC } from 'react';

interface IOrdersCounter {
  doneList: Array<number>;
  preparingList: Array<number>;
  total: number;
  totalToday: number;
}

export const OrdersCounter: FC<IOrdersCounter> = ({ doneList, preparingList, total, totalToday }) => {

  return (
    <section className={styles.wrapper}>
      <div className={'mb-15 ' + styles.container}>
        <div className={styles.counter}>
          <h4 className='text text_type_main-medium'>Готовы:</h4>
          <ul className={styles.list}>
            {doneList.map((item, index) => {
              return (
                <li className={'text text_type_digits-default text_color_success'} key={index}>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.counter}>
          <h4 className='text text_type_main-medium'>В работе:</h4>
          <ul className={styles.list}>
            {preparingList.map((item, index) => {
              return (
                <li className={'text text_type_digits-default'} key={index}>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <article className="completed">
        <h3 className="text text_type_main-medium">Выполнено за всё время:</h3>
        <span className={"text text_type_digits-large " + styles.digits}>{total}</span>
      </article>
      <article className="completed">
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <span className={"text text_type_digits-large " + styles.digits}>{totalToday}</span>
      </article>
    </section>
  )
};