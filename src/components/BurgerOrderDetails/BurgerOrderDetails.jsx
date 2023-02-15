import styles from './BurgerOrderDetails.module.css';
import { useSelector } from "react-redux";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from "react-router-dom";
import { BurgerContains } from "../BurgerContains/BurgerContains";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerOrderDetails() {
  const orders = useSelector((store) => store.socketReducer.orders);
  const { id } = useParams();
  const order = orders.find((item) => item._id === id);

  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const getOrderList = () => {
    const elements = [];
    order.ingredients.forEach((ingredientId) => {
      ingredients.forEach((ingredient) => {
        if (ingredient._id === ingredientId) {
          elements.push(ingredient);
        }
      });
    });

    return elements;
  };
  const orderIngredients = getOrderList();
  const statusClassName = document.querySelectorAll('.status');
  const getOrderStatus = () => {
    if (order.status === "done") {
      statusClassName.forEach((element) => {
        element.classList.add('text_color_success');
      })
      return "Выполнен";
    } else {
      statusClassName.forEach((element) => {
        element.classList.add('text_color_primary');
      })
      return "Готовится";
    }
  };
  const orderStatus = getOrderStatus();

  const orderPrice = orderIngredients.reduce((count, item) => {
    return count + item.price;
  }, 0);

  const currentDate = new Date().getTimezoneOffset() / 60;
  const time = "i-GMT" + (currentDate > 0 ? "-" + currentDate : "+" + -currentDate);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={'text text_type_digits-default mb-10 ' + styles.number}>{`#${order.number}`}</p>
        <p className='text text_type_main-medium mb-2'>{`${order.name}`}</p>
        <p className='text text_type_main-default status'>{orderStatus}</p>
      </div>
      <BurgerContains ingredients={orderIngredients} />
      <div className={styles.container}>
        <p className="text text_type_main-default text_color_inactive">
        <FormattedDate date={new Date(order.createdAt)} /> {`${time}`}
        </p>
        <div className={styles.price}>
          <CurrencyIcon type="primary" />
          <p className="text text_type_digits-default">{orderPrice}</p>
        </div>
      </div>
    </div>
  );
}