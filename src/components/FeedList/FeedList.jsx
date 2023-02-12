import { OrderElement } from "../OrderElement/OrderElement"

export function FeedList({ orders, listClassName }) {

  return (
    <ul className={listClassName}>
      {orders.map((order) => {
        return (
          <OrderElement key={order._id} order={order} />
        )
      })}
    </ul>
  )
}