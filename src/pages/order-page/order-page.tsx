import styles from './order-page.module.css';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useParams } from "react-router-dom";
import BurgerOrderDetails from "../../components/BurgerOrderDetails/BurgerOrderDetails";
import { getIngredientsData } from '../../services/actions/ingredients';
import { wsUrl } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { IWsMessage, wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';

interface IOrderPage {
  isLogin: boolean;
}

export const OrderPage: FC<IOrderPage> = ({ isLogin }) => {

  const dispatch = useDispatch();
  const orders = useSelector((state: { socketReducer: IWsMessage }) => state.socketReducer.orders);
  const { id } = useParams();
  const order = orders.find((item) => item._id === id);

  useEffect(() => {
    dispatch(getIngredientsData());
    isLogin
      ? dispatch(wsConnectionStart(`${wsUrl}?token=${getCookie("accessToken")?.split("Bearer ")[1]}`))
      : dispatch(wsConnectionStart(`${wsUrl}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

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