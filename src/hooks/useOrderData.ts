import { useSelector } from "../services/hooks";
import { useMatch } from "react-router-dom";
import { IOrderDetails } from "../services/actions/orderActions";
import { IIngredient } from "../services/actions/ingredientsActions";

export const useOrderData = (order: IOrderDetails | undefined) => {
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);

  const getOrderList = () => {
    const elements: Array<IIngredient> = [];
    order?.ingredients.forEach((ingredientId) => {
      ingredients.forEach((ingredient: IIngredient) => {
        if (ingredient._id === ingredientId) {
          elements.push(ingredient);
        }
      });
    });

    return elements;
  };
  const orderIngredients = getOrderList();

  const getOrderStatus = () => {
    if (order?.status === "done") {
      return "Выполнен";
    } else {
      return "Готовится";
    }
  };
  const orderStatus = getOrderStatus();

  const orderPrice = orderIngredients.reduce((count, item) => {
    return count + item.price;
  }, 0);

  const currentDate = new Date().getTimezoneOffset() / 60;
  const time = "i-GMT" + (currentDate > 0 ? "-" + currentDate : "+" + -currentDate);

  const matchProfile = useMatch('/profile/orders/');
  const feedMatch = useMatch('/feed');

  return { orderIngredients, orderPrice, orderStatus, time, feedMatch, matchProfile };
};