import styles from './feed.module.css';
import { FeedList } from '../../components/FeedList/FeedList';
import { OrdersCounter } from '../../components/OrderaCounter/OrdersCounter';
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
        <OrdersCounter doneList={doneList} preparingList={preparingList} total={total} totalToday={totalToday} />
      </div>
    </div>
  )
  )
}