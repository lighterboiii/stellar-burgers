import { FC } from 'react';
import { IOrderDetails } from '../../services/actions/orderActions';
import { OrderFeedElement } from "../OrderFeedElement/OrderFeedElement"
import styles from './FeedList.module.css';

interface IFeedList {
  orders: Array<IOrderDetails>;
}

export const FeedList: FC<IFeedList> = ({ orders }) => {

  return (
    <>
      <ul className={styles.list + ' custom-scroll'}>
        {orders.map((order) => {
          return (
            <OrderFeedElement key={order._id} order={order} />
          )
        })}
      </ul>
    </>
  )
};