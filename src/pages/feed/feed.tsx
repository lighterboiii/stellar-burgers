import styles from './feed.module.css';
import { FeedList } from '../../components/FeedList/FeedList';
import { OrdersCounter } from '../../components/OrdersCounter/OrdersCounter';
import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActions';
import { wsUrl } from '../../utils/constants';
import { TSocketState } from '../../services/reducers/wsReducer';

interface IOrderStatus {
  doneList: Array<number>;
  preparingList: Array<number>;
}

export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state: { socketReducer: TSocketState }) => state.socketReducer);

  useEffect(() => {
    dispatch(wsConnectionStart(`${wsUrl}/all`))
    return () => {
      dispatch(wsConnectionClosed())
    }
  }, []);

  const { doneList, preparingList } = useMemo(() => {
    return orders.reduce<IOrderStatus>(
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
    <>
    <div className={styles.wrapper}>
      <h2 className={'text text_type_main-large mb-5 ' + styles.title}>Лента заказов</h2>
      <div className={styles.content}>
        <FeedList orders={orders} />
        <OrdersCounter doneList={doneList} preparingList={preparingList} total={total} totalToday={totalToday} />
      </div>
    </div>
    </>
  )
  )
};
