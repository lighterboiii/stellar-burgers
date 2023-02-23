import styles from './OrderFeedElement.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { OrderImagesList } from '../OrderImagesList/OrderImagesList';
import { useEffect } from 'react';
import { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

export function OrderFeedElement({ order }) {
  
  const location = useLocation();
  const [isProfile, setIsProfile] = useState(false);

  const { orderIngredients, orderStatus, orderPrice, time, matchProfile } = useOrderData(order);

  useEffect(() => {
    if (matchProfile) {
      setIsProfile(true)
    }
  }, [])
  
  return (
    <article className={styles.order}>
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

OrderFeedElement.propTypes = {
  order: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  })
}