import styles from './OrderPageItem.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from 'react';
import { IIngredient } from '../../services/actions/ingredientsActions';

interface IOrderPageItem {
  ingredient: IIngredient;
  counter: number;
}

export const OrderPageItem: FC<IOrderPageItem> = ({ ingredient, counter }) => { 

  return (
    <li className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name} />
        </div>
        <p className={'text text_type_main-default ' + styles.name}>
          {ingredient.name}
        </p>
      </div>
      <div className={styles.price}>
        <p className='text text_type_digits-default'>{`${counter} x ${ingredient.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
};