import styles from './OrdersCounter.module.css';
import PropTypes from 'prop-types';

export function OrdersCounter({ doneList, preparingList, total, totalToday }) {

  return (
    <section className={styles.wrapper}>
      <div className={'mb-15 ' + styles.container}>
        <div className={styles.counter}>
          <h4 className='text text_type_main-medium'>Готовы:</h4>
          <ul className={styles.list}>
            {doneList.map((item) => {
              return (
                <li className={'text text_type_digits-default text_color_success'}>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.counter}>
          <h4 className='text text_type_main-medium'>В работе:</h4>
          <ul className={styles.list}>
            {preparingList.map((item) => {
              return (
                <li className={'text text_type_digits-default'}>
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
}

OrdersCounter.propTypes = {
  doneList: PropTypes.array.isRequired,
  preparingList: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  totalToday: PropTypes.number.isRequired
}
