import styles from './OrderFeedElement.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { OrderImagesList } from '../OrderImagesList/OrderImagesList';
import { useEffect } from 'react';
import { useState } from 'react';

export function OrderFeedElement({ order }) {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const location = useLocation();
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    if (matchProfile) {
      setIsProfile(true)
    }
  })

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

  const matchProfile = useMatch('/profile/orders');
  
  return (
    <article className={Boolean(matchProfile) ? styles.orderProfile : styles.order}>
      <Link className={styles.link}  to={isProfile ? `/profile/orders/${order._id}` : `/feed/${order._id}`}
        state={isProfile ? { locationProfileFeed: location } : { locationFeedList: location }}>
        <div className={styles.info + ' mb-6'}>
          <p className={'text text_type_digits-default'}>#{order.number}</p>
          <p className={"text text_color_inactive text_type_main-default "}>
            <FormattedDate date={new Date(order.createdAt)} /> {`${time}`}
          </p>
        </div>
        <h3 className={'text text_type_main-medium'}>{order.name}</h3>
        {Boolean(matchProfile) &&
          <p className='text text_type_main-default status'>{orderStatus}</p>
        }
        <div className={styles.info + ' mt-6'}>
          <OrderImagesList ingredients={orderIngredients} />
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{orderPrice}{<CurrencyIcon />}</span>
        </div>
      </Link>
    </article>
  )
}