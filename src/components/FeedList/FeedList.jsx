import { OrderFeedElement } from "../OrderFeedElement/OrderFeedElement"
import styles from './FeedList.module.css';

export function FeedList({ orders }) {
  return (
    <ul className={styles.list + ' custom-scroll'}>
      {orders.map((order) => {
        return (
          <OrderFeedElement key={order._id} order={order} />
        )
      })}
    </ul>
  )
}