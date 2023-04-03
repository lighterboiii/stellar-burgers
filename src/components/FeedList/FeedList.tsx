import { FC, useEffect } from 'react';
import { IOrderDetails } from '../../services/actions/orderActions';
import { OrderFeedElement } from "../OrderFeedElement/OrderFeedElement"
import styles from './FeedList.module.css';
import { v4 as uuidv4 } from 'uuid';

interface IFeedList {
  orders: Array<IOrderDetails>;
}

export const FeedList: FC<IFeedList> = ({ orders }) => {
  
  return (
    <>
      <ul className={styles.list + ' custom-scroll'}>
        {orders.map((order) => {
          return (
            <OrderFeedElement key={uuidv4()} order={order} />
          )
        })}
      </ul>
    </>
  )
};