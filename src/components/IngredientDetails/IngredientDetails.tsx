import styles from './IngredientDetails.module.css'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { FC } from 'react';
import { IIngredient } from '../../services/actions/ingredients';
import { TIngredientsState } from '../../services/reducers/ingredientsReducer';

const IngredientDetails: FC = () => {

  const ingredients = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.ingredients);
  const { id } = useParams();
  const currentIngredient = ingredients.find((item: IIngredient) => item._id === id);

  return (
    <div className={styles.wrapper + ' pb-15 pl-10 pr-10'}>
        <img src={currentIngredient?.image_large} alt={currentIngredient?.name} />
        <h4 className={'mt-4 mb-8 text text_type_main-medium ' + styles.title}>{currentIngredient?.name}</h4>
      <ul className={styles.options}>
        <li className={styles.characts}>
          <span className={'text text_color_inactive text_type_main-default'}>Калории,ккал</span>
          <span className='text text_type_digits-default text_color_inactive'>{currentIngredient?.calories}</span>
        </li>
        <li className={styles.characts}>
          <span className={'text text_color_inactive text_type_main-default'}>Белки,г</span>
          <span className='text text_type_digits-default text_color_inactive'>{currentIngredient?.proteins}</span>
        </li>
        <li className={styles.characts}>
          <span className={'text text_color_inactive text_type_main-default'}>Жиры,г</span>
          <span className='text text_type_digits-default text_color_inactive'>{currentIngredient?.fat}</span>
        </li>
        <li className={styles.characts}>
          <span className={'text text_color_inactive text_type_main-default'}>Углеводы,г</span>
          <span className='text text_type_digits-default text_color_inactive'>{currentIngredient?.carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;