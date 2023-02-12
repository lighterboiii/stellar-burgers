import styles from './feed.module.css';
import { FeedList } from '../../components/FeedList/FeedList';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnectionStartAll } from '../../services/actions/wsActions';

export function FeedPage() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.socketReducer);

  useEffect(() => {
    dispatch(wsConnectionStartAll())
  }, [dispatch])

  const { doneList, preparingList } = useMemo(() => {
    return orders.reduce(
      (count, element) => {
        switch (element.status) {
          case "done":
            count.doneList.push(element.number);
            break;
          case "pending":
            count.preparingList.push(element.number);
            break;
        }
        return count;
      },
      { doneList: [], preparingList: [] }
    );
  }, [orders]);

  return (
    orders && (
    <div className={styles.wrapper}>
      <h2 className={'text text_type_main-large mb-5 ' + styles.title}>Лента заказов</h2>
      <div className={styles.content}>
        <FeedList listClassName={styles.list} orders={orders} />
        <section className={styles.statistics}>
          <div className={'mb-15 ' + styles.container}>
            <div className={styles.counter}>
              <h4 className='text text_type_main-medium mb-6'>Готовы:</h4>
              <ul className={styles.list}>
                <li className={'text text_color_success text_type_digits-default ' + styles.li}>1001</li>
                <li className={'text text_color_success text_type_digits-default ' + styles.li}>1003</li>
                <li className={'text text_color_success text_type_digits-default ' + styles.li}>1004</li>
                <li className={'text text_color_success text_type_digits-default ' + styles.li}>1005</li>
              </ul>
            </div>
            <div className={styles.counter}>
              <h4 className='text text_type_main-medium mb-6'>В работе:</h4>
              <ul className={styles.list}>
                <li className={'text text_type_digits-default ' + styles.li}>3092</li>
                <li className={'text text_type_digits-default ' + styles.li}>3092</li>
                <li className={'text text_type_digits-default ' + styles.li}>1002</li>
              </ul>
            </div>
          </div>
          <article className="completed mb-15">
            <h3 className="text text_type_main-medium">Выполнено за всё время:</h3>
            <span className={"text text_type_digits-large " + styles.digits}>4000</span>
          </article>
          <article className="completed">
            <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
            <span className={"text text_type_digits-large " + styles.digits}>3</span>
          </article>
        </section>
      </div>
    </div>
  )
  )
}