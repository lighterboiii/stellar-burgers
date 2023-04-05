import styles from './OrderFeedElement.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { OrderImagesList } from '../OrderImagesList/OrderImagesList';
import { FC, useEffect } from 'react';
import { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';
import { IOrderDetails } from '../../services/actions/orderActions';

interface IOrderFeedElement {
  order: IOrderDetails;
}

export const OrderFeedElement: FC<IOrderFeedElement> = ({ order }) => {
  
  const location = useLocation();
  const [isProfile, setIsProfile] = useState(false);

  const { orderIngredients, orderStatus, orderPrice, time, matchProfile } = useOrderData(order);

  useEffect(() => {
    if (matchProfile) {
      setIsProfile(true)
    }
  }, [])
  
  return (
    <article className={Boolean(matchProfile) ? `${styles.profileOrder}` : `${styles.order}`}>
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
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{orderPrice}{<CurrencyIcon type='primary' />}</span>
        </div>
      </Link>
    </article>
  )
};