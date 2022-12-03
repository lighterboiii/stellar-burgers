import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  DragIcon,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { useMemo } from "react";
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';


function BurgerConstructor({ data, setShowOrderPopup }) {

  const notBun = useMemo(() => data.filter((item) => item.type !== 'bun'), [data]);
  const bun = data.find((item) => item.type === 'bun');

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
        <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>610{<CurrencyIcon />}</span>
        <Button size="large" type="primary" onClick={() => setShowOrderPopup(true)}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setShowOrderPopup: PropTypes.func.isRequired
};

export default BurgerConstructor;