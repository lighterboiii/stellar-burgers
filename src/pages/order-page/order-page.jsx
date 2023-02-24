import styles from './order-page.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BurgerOrderDetails from "../../components/BurgerOrderDetails/BurgerOrderDetails";
import { getIngredientsData } from '../../services/actions/ingredients';
import { wsUrl } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';

export function OrderPage({ isLogin }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.socketReducer.orders);
  const { id } = useParams();
  const order = orders.find((item) => item._id === id);

  useEffect(() => {
    dispatch(getIngredientsData());
    isLogin
      ? dispatch(wsConnectionStart(`${wsUrl}?token=${getCookie("accessToken").split("Bearer ")[1]}`))
      : dispatch(wsConnectionStart(`${wsUrl}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [isLogin, dispatch]);

  return (
    order && (
      <div className={styles.container}>
        <BurgerOrderDetails />
      </div>
    )
  )
}