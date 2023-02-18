import styles from './order-page.module.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BurgerOrderDetails from "../../components/BurgerOrderDetails/BurgerOrderDetails";

export function OrderPage() {
  const orders = useSelector((state) => state.socketReducer.orders);
  const { id } = useParams();

  const order = orders.find((item) => item._id === id);

  return (
    order && (
      <div className={styles.container}>
        <BurgerOrderDetails />
      </div>
    )
  )
}