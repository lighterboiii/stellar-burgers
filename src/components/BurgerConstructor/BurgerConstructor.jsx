import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {
  SET_ORDER_DETAILS,
  SELECT_INGREDIENT,
  sortIngredients
} from '../../services/actions/actions';
import { useMemo, useCallback } from "react";
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import { sendOrder } from '../../utils/burger-api';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { SelectedIngredient } from "./SelectedIngredient/SelectedIngredient";

function BurgerConstructor({ setShowOrderPopup }) {
  const dispatch = useDispatch();

  const burgerData = useSelector(state => state.ingredients.ingredients);
  const selectedIngredients = useSelector(state => state.ingredients.selectedIngredients);
  const notBun = useMemo(() => selectedIngredients.filter((ingredient) => ingredient.type !== 'bun'), [selectedIngredients]);
  const bun = selectedIngredients.find((item) => item.type === 'bun');
  //calculating items prices
  const sum = useMemo(() => {
    return selectedIngredients.reduce(
      (acc, ingredient) =>
        ingredient.type === 'bun' ? acc + ingredient.price * 2 : acc + ingredient.price, 0);
  }, [selectedIngredients]);
// order button listener
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
// drop listener
  const handleDrop = (item) => {
    const selectedIngredient = burgerData.find(ingredient => ingredient._id === item._id);
    dispatch({
      type: SELECT_INGREDIENT,
      payload: [...selectedIngredients, selectedIngredient]
    })
  };
// drop hook
  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      handleDrop(item)
    },
  });
// not-working 
  const moveIngredients = useCallback((dragIndex, hoverIndex, selectedIngredients) => {
    dispatch(sortIngredients(dragIndex, hoverIndex, selectedIngredients));
  },[selectedIngredients, dispatch]);

  return (
    <section className={`${styles.section} ${isHover && styles.dropping}`} ref={dropRef}>
      <div className={`mb-10 mt-25`}>
        <div className={'mb-4 ml-4 mr-4 pl-8'}>
          {bun &&
            selectedIngredients.length > 0 ? <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            thumbnail={bun.image}
            price={bun.price}
          /> : <ConstructorElement
            type="top"
            isLocked={true}
            text={'Выберите булочку (верх)'}
            price={0}
            thumbnail={`https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg`}
          />
          }
        </div>
        <ul className={'text custom-scroll ' + styles.list}>
          {notBun.map((element, index) => (
             <SelectedIngredient ingredient={element} moveIngredient={moveIngredients} index={index} key={`${element.id}${index}`}/>
          ))
          }
        </ul>
        <div className={' ml-4 mr-4 pl-8'}>
          {bun &&
            selectedIngredients.length > 0 ? <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            thumbnail={bun.image}
            price={bun.price}
          /> : <ConstructorElement
            type="bottom"
            isLocked={true}
            text={'Выберите булочку (низ)'}
            price={0}
            thumbnail={`https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg`}
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
          <Button size="large" type="secondary" htmlType='button' disabled onClick={onOrderClick}>Оформить заказ</Button>
        </div>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  setShowOrderPopup: PropTypes.func.isRequired
};

export default BurgerConstructor;