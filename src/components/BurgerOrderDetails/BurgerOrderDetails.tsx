import styles from './BurgerOrderDetails.module.css';
import { useSelector } from '../../services/hooks';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from "react-router-dom";
import { BurgerContains } from "../BurgerContains/BurgerContains";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useOrderData } from '../../hooks/useOrderData';
import { FC } from 'react';

const BurgerOrderDetails: FC = () => {

  const { id } = useParams();
  const orders = useSelector((state) => state.socketReducer.orders);
  const order = orders.find((item) => item?._id === id);
  const { orderIngredients, orderStatus, orderPrice, time } = useOrderData(order);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={'text text_type_digits-default mb-10 ' + styles.number}>{`#${order?.number}`}</p>
        <p className='text text_type_main-medium mb-2'>{`${order?.name}`}</p>
        {(order?.status === 'done') 
            ? <p className='text text_type_main-default text_color_success'>{orderStatus}</p>
            : <p className='text text_type_main-default text_color_primary'>{orderStatus}</p>
        }
      </div>
      <BurgerContains ingredients={orderIngredients} />
      <div className={styles.container}>
        <p className="text text_type_main-default text_color_inactive">
         {order && <FormattedDate date={new Date(order.createdAt)} />} {`${time}`}
        </p>
        <div className={styles.price}>
          <CurrencyIcon type="primary" />
          <p className="text text_type_digits-default">{orderPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default BurgerOrderDetails;