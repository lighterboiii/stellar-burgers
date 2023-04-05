import styles from './OrderIngredientImage.module.css';
import { FC } from 'react';
import { IIngredient } from '../../services/actions/ingredientsActions';

interface IOrderIngredientImage {
  showMore: boolean;
  length: number;
  ingredient: IIngredient;
  index: number;
}

export const OrderIngredientImage: FC<IOrderIngredientImage> = ({ showMore, length, ingredient, index }) => {

  return (
    <>
      <li className={styles.element} style={{ zIndex: 20 - index }} >
        <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name} />
        {showMore && (
          <p className={'text text_type_digits-default ' + styles.text}>{`+${length - 6}`}</p>
        )}
      </li>
    </>
  )
};