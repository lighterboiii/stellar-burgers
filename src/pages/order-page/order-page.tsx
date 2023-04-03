import styles from './order-page.module.css';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useParams } from "react-router-dom";
import BurgerOrderDetails from "../../components/BurgerOrderDetails/BurgerOrderDetails";
import { WS_URL_ALL, WS_URL_PROFILE } from '../../utils/constants';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';
import { IOrderDetails } from '../../services/actions/orderActions';

interface IOrderPage {
  isLogin: boolean;
}

export const OrderPage: FC<IOrderPage> = ({ isLogin }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    isLogin
      ? dispatch(wsConnectionStart(WS_URL_PROFILE))
      : dispatch(wsConnectionStart(WS_URL_ALL));
    return () => {
      dispatch(wsConnectionClosed());
    };
  // eslint-disable-next-line
  }, [isLogin]);

  const orders = useSelector((store) => store.socketReducer.orders);
  console.log(orders);
  const { id } = useParams();
  const order = orders.find((item: IOrderDetails) => item._id === id);

  return (
    <>
      {order && (
      <div className={styles.container}>
        <BurgerOrderDetails />
      </div>
      )}
    </>
  )
};
