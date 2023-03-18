import styles from './OrderDetails.module.css';
import { useSelector } from '../../../services/hooks';
import { Loader } from '../../Loader/Loader';
import { FC } from 'react';

const OrderDetails: FC = () => {
  const { orderRequest, orderDetails } = useSelector((state) => state.orderData); //TODO исправить

  return (
    <div className={styles.card + ' pt-15 pb-30 pr-25 pl-25'}>
      {orderRequest ? (
        <Loader loading={orderRequest} />
      ) : (
        <>
          <h3 className={styles.order + ' text text_type_digits-large mb-8'}> 
            {orderDetails.order.number}  {/*починить*/}
          </h3>
          <p className='text text_type_main-medium mb-10'>Идентификатор заказа</p>
          <span className={'mb-10 ' + styles.span}>
            <img src="https://stellarburgers.nomoreparties.site/static/media/tick.887b83be.gif" alt="Ready icon" className={styles.icon}/>
          </span>
          <p className={'text text_type_main-default mb-2 ' + styles.burgerName}>
            Ваш {orderDetails.order.name} начали готовить {/*починить*/}
          </p>
          <p className={'text text_type_main-default text_color_inactive ' + styles.burgerName}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;