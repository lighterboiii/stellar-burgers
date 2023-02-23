import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

export function useOrderData(order) {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const getOrderList = () => {
    const elements = [];
    order.ingredients.forEach((ingredientId) => {
      ingredients.forEach((ingredient) => {
        if (ingredient._id === ingredientId) {
          elements.push(ingredient);
        }
      });
    });

    return elements;
  };
  const orderIngredients = getOrderList();
  const statusClassName = document.querySelectorAll('.status');

  const getOrderStatus = () => {
    if (order.status === "done") {
      statusClassName.forEach((element) => {
        element.classList.add('text_color_success');
      })
      return "Выполнен";
    } else {
      statusClassName.forEach((element) => {
        element.classList.add('text_color_primary');
      })
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
}