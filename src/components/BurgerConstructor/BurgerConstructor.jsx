import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  DragIcon,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {
  SET_ORDER_DETAILS,
  SELECT_INGREDIENT,
  DELETE_INGREDIENT
} from '../../services/actions/actions';
import { useMemo } from "react";
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import { sendOrder } from '../../utils/burger-api';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";

function BurgerConstructor({ setShowOrderPopup }) {
  const dispatch = useDispatch();

  const burgerData = useSelector(state => state.ingredients.ingredients);
  const selectedIngredients = useSelector(state => state.ingredients.selectedIngredients);
  const notBun = useMemo(() => selectedIngredients.filter((item) => item.type !== 'bun'), [selectedIngredients]);
  const bun = selectedIngredients.find((item) => item.type === 'bun');

  const sum = useMemo(() => {
    return selectedIngredients.reduce(
      (acc, ingredient) =>
        ingredient.type === 'bun' ? acc + ingredient.price * 2 : acc + ingredient.price, 0);
  }, [selectedIngredients]);

  const onOrderClick = () => {
    const dataId = burgerData.map((element) => element._id);
    sendOrder(dataId)
      .then(res =>
        dispatch({
          type: SET_ORDER_DETAILS,
          payload: res
        }))
      .catch(err => console.log(`Ошибка ${err.status}`));
    setShowOrderPopup(true);
  };

  const handleDrop = (item) => {
    const selectedIngredient = burgerData.find(ingredient => ingredient._id === item._id);
    dispatch({
      type: SELECT_INGREDIENT,
      payload:  [...selectedIngredients, selectedIngredient]
    })
  };

  const handleDeleteIngredient = (item) => {
    const selectedIndex = selectedIngredients.indexOf(item)
    const newIngredientsArray = selectedIngredients.slice();
    newIngredientsArray.splice(selectedIndex, 1);
    dispatch({ 
      type: 'DELETE_INGREDIENT', 
      payload: newIngredientsArray });
  };

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      handleDrop(item)
    },
  });

  return (
    <section className={`${styles.section} ${isHover && styles.dropping}`} ref={dropRef}>
      <div className={`mt-25 mb-10`}>
        <div className={'mb-4 ml-4 mr-4 pl-8'}>
          {bun && 
            selectedIngredients.length > 0 ? <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + ' (верх)'}
              thumbnail={bun.image}
              price={bun.price}
            /> : <p className="text text_type_main-medium pt-3">Перетащите булочку сюда</p>
          }
        </div>
        <ul className={'text custom-scroll ' + styles.list}>
          {notBun.map((element) => {
            return (
              <li className={'mb-4 ml-4 mr-1 ' + styles.element} key={element._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={element.name}
                  thumbnail={element.image}
                  price={element.price}
                  handleClose={handleDeleteIngredient}
                />
              </li>
            )
          })
          }
        </ul>
        <div className={' ml-4 mr-4 pl-8'}>
          {bun && 
            selectedIngredients.length > 0 && <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + ' (низ)'}
              thumbnail={bun.image}
              price={bun.price}
            />
          }
        </div>
      </div>
      {selectedIngredients.length > 0 ?
      <div className={'mr-4 ' + styles.total}>
        <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{sum}{<CurrencyIcon />}</span>
        <Button size="large" type="primary" htmlType='button' onClick={onOrderClick}>Оформить заказ</Button>
      </div> : 
       <div className={'mr-4 ' + styles.total}>
       <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{sum}{<CurrencyIcon />}</span>
       <Button size="large" type="disabled" htmlType='button' disabled onClick={onOrderClick}>Оформить заказ</Button>
     </div>
}
    </section>
  )
}

BurgerConstructor.propTypes = {
  setShowOrderPopup: PropTypes.func.isRequired
};

export default BurgerConstructor;