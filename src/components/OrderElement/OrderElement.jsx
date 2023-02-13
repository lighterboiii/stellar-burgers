import styles from './OrderElement.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { OrderImagesList } from '../OrderImagesList/OrderImagesList';

export function OrderElement({ order }) {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const id = order._id;

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
  // const getOrderStatus = () => {
  //   if (order.status === "done") {
  //     return "Выполнен";
  //   } else {
  //     return "Готовится";
  //   }
  // };
  // использовать в компоненте страницы заказа в профиле
  // const orderStatus = getOrderStatus();

  const orderPrice = orderIngredients.reduce((count, item) => {
    return count + item.price;
  }, 0);

  const currentDate = new Date().getTimezoneOffset() / 60;
  const time = "i-GMT" + (currentDate > 0 ? "-" + currentDate : "+" + -currentDate);

  return (
    <article className={styles.order + ' mr-2'}>
      <Link className={styles.link} to={`/orders/${id}`} >
        <div className={styles.info + ' mb-6'}>
          <p className={'text text_type_digits-default'}>{order.number}</p>
          <p className={"text text_color_inactive text_type_main-default "}>
          <FormattedDate date={new Date(order.createdAt)} />{`${time}`}
          </p>
        </div>
        <h3 className={'text text_type_main-medium mb-6'}>{order.name}</h3>
        <div className={styles.info}>
          <OrderImagesList ingredients={orderIngredients} />
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{orderPrice}{<CurrencyIcon />}</span>
        </div>
      </Link>
    </article>
  )
}