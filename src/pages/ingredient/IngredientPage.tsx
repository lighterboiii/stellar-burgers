import styles from './ingredientPage.module.css';
import IngredientDetails from "../../components/Modal/IngredientDetails/IngredientDetails";
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { IIngredient } from '../../services/actions/ingredients';
import { TIngredientsState } from '../../services/reducers/ingredientsReducer';

export const IngredientPage: FC = () => {
  const ingredients = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.ingredients);

  let { id } = useParams();

  const currentIngredient = ingredients.find((el: IIngredient) => el._id === id);

  return (
    <>
      currentIngredient && (
      <div className={styles.wrapper}>
        <IngredientDetails currentIngredient={currentIngredient} />
      </div>
      )
    </>
  )
};