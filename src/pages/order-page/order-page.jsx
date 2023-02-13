import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function OrderPage() {
  const orders = useSelector((state) => state.socketReducer.orders);
  const { id } = useParams();
  const order = orders.find((item) => item._id === id);

  return (
    order && (
      <div className="wrapper">
        <div>
          <p className="order-number">{order.number}</p>
          <h4 className="order-name">{order.name}</h4>
        </div>
        <div>
          <p className="includes">Состав</p>
          <div className='custom-scroll'>
            Ингредиенты
          </div>
        </div>
        <div>
          <p className="time">Вчера, 13:50 i-GMT+3</p>
          <p className="price">300</p> <CurrencyIcon />
        </div>
      </div>
    )
  )
}