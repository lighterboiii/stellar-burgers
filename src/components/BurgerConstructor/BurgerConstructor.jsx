import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  DragIcon,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { useMemo, useContext } from "react";
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import { OrderContext } from "../../utils/OrderContext";
import { sendOrder } from '../../utils/burger-api';
import { useDispatch, useSelector } from 'react-redux';


function BurgerConstructor({ setShowOrderPopup }) {
  const burgerData = useSelector(state => state.ingredients.ingredients);
  const { setOrderDetails } = useContext(OrderContext);

  const notBun = useMemo(() => burgerData.filter((item) => item.type !== 'bun'), [burgerData]);
  const bun = burgerData.find((item) => item.type === 'bun');

  const sum = useMemo(() => {
    return burgerData.reduce(
      (acc, ingredient) => 
      ingredient.type === bun ? acc + ingredient.price * 2 : acc + ingredient.price, 0);
  }, [burgerData]);

  const onOrderClick = () => {
    const dataId = burgerData.map((element) => element._id);
    sendOrder(dataId)
      .then(res => setOrderDetails(res))
      .catch(err => console.log(`Ошибка ${err.status}`))
    setShowOrderPopup(true);
  }

  return (
    <section className={styles.section}>
      <div className={'mt-25 mb-10'}>
        <div className={'mb-4 ml-4 mr-4 pl-8'}>
        {bun && (
        <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            thumbnail={bun.image}
            price={bun.price}
          />
        )}
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
                />
              </li>
            )
          })
          }
        </ul>
        <div className={' ml-4 mr-4 pl-8'}>
          {bun && (
              <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + ' (низ)'}
              thumbnail={bun.image}
              price={bun.price}
            />
            )}
        </div>
      </div>
      <div className={'mr-4 ' + styles.total}>
        <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{sum}{<CurrencyIcon />}</span>
        <Button size="large" type="primary" htmlType='button' onClick={onOrderClick}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  setShowOrderPopup: PropTypes.func.isRequired
};

export default BurgerConstructor;