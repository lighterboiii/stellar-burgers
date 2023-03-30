import styles from './order-page.module.css';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useParams } from "react-router-dom";
import BurgerOrderDetails from "../../components/BurgerOrderDetails/BurgerOrderDetails";
import { wsUrl } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';
import { IOrderDetails } from '../../services/actions/orderActions';

export const OrderPage: FC = () => {

  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.userReducer.isLogin);

  useEffect(() => {
    isLogin
      ? dispatch(wsConnectionStart(`${wsUrl}?token=${getCookie("accessToken")?.split("Bearer ")[1]}`))
      : dispatch(wsConnectionStart(`${wsUrl}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  // eslint-disable-next-line
  }, []);

  const orders = useSelector((store) => store.socketReducer.orders);
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