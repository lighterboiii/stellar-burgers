import styles from './OrderElement.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

export function OrderElement({ order }) {
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

  // const getOrderStatus = () => {
  //   if (order.status === "done") {
  //     return "Выполнен";
  //   } else {
  //     return "Готовится";
  //   }
  // };
// использовать в компоненте страницы заказа в профиле
  // const orderStatus = getOrderStatus();
  const orderIngredients = getOrderList();

  const orderPrice = orderIngredients.reduce((count, item) => {
    return count + item.price;
  }, 0);

  return (
    <article className={styles.order + ' mr-2'}>
      <div className={styles.info + ' mb-6'}>
        <p className={'text text_type_digits-default'}>{order.number}</p>
        <p className={"text text_color_inactive text_type_main-default "}>{order.createdAt}</p>
      </div>
      <h3 className={'text text_type_main-medium mb-6'}>{order.name}</h3>
      <div className={styles.info}>
        <img src="" alt="Картинки там всякие" />
        <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{orderPrice}{<CurrencyIcon />}</span>
      </div>
    </article>
  )
}