import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIngredientsData } from "../../services/actions/ingredients";
import { wsConnectionStart, wsConnectionClosed } from "../../services/actions/wsActions";
import { wsUrl } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import BurgerOrderDetails from "../../components/BurgerOrderDetails/BurgerOrderDetails";

export function OrderPage() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userInfo.user);
  const accessToken = getCookie("accessToken").split("Bearer ")[1];

  useEffect(() => {
    dispatch(getIngredientsData())
    userData ? dispatch(wsConnectionStart(`${wsUrl}?token=${accessToken}`)) : dispatch(wsConnectionStart(`${wsUrl}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [accessToken, userData, dispatch]);

  const orders = useSelector((state) => state.socketReducer.orders);
  const { id } = useParams();

  const order = orders.find((item) => item._id === id);

  return (
    order && (
      <div className="wrapper">
        <BurgerOrderDetails />
      </div>
    )
  )
}