import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';


function BurgerConstructor( {data} ) {
  return (
    <section className={styles.section}>
      <div className={'mt-25 mb-10'}>
        <div className={'mb-4 ml-4 mr-4 pl-8'}>
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={'Краторная булка N-200i (верх)'}
            thumbnail={require('@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png')}
            price={117}
          />
        </div>
        <ul className={'text custom-scroll ' + styles.list}>
          {data.map((element) => {
            if (element.type === 'sauce' || element.type === 'main') {
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
            }
          })}
        </ul>
        <div className={' ml-4 mr-4 pl-8'}>
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={'Краторная булка N-200i (низ)'}
            thumbnail={require('@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png')}
            price={117}
          />
        </div>
      </div>
      <div className={'mr-4 ' + styles.total}>
        <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>610{<CurrencyIcon />}</span>
        <Button size="large" type="primary">Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = { data: PropTypes.array.isRequired };

export default BurgerConstructor;