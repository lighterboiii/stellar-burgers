import { OrderElement } from "../OrderElement/OrderElement"
import styles from './FeedList.module.css';

export function FeedList({ orders }) {

  return (
    <ul className={styles.list + ' custom-scroll'}>
      {orders.map((order) => {
        return (
          <OrderElement key={order._id} order={order} />
        )
      })}
    </ul>
  )
}