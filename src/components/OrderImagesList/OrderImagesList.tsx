import styles from './OrderImagesList.module.css';
import { OrderIngredientImage } from "../OrderIngredientImage/OrderIngredientImage";
import { FC } from 'react';
import { IIngredient } from '../../services/actions/ingredientsActions';

interface IOrderImagesList {
  ingredients: Array<IIngredient>;
}

export const OrderImagesList: FC<IOrderImagesList> = ({ ingredients }) => {

  function showMore() {
    if (ingredients.length - 6 === 0) {
      return false
    } return true;
  }

  return (
    <ul className={styles.list}>
      {/* eslint-disable */}
      {ingredients.map((el, index) => {
        if (index === 5) {
          return (
            <OrderIngredientImage
              length={ingredients.length}
              ingredient={el}
              showMore={showMore()}
              index={index}
              key={index}
            />
          )
        } else if (index < 5) {
          return (
            <OrderIngredientImage
              length={ingredients.length}
              ingredient={el}
              showMore={false}
              index={index}
              key={index}
            />
          )
        }
      })
      }
    </ul>
  )
};
{/* eslint-enable */ }
