import styles from './ingredientPage.module.css';
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { useSelector } from '../../services/hooks';
import { useParams, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { IIngredient } from '../../services/actions/ingredientsActions';
import { HomePage } from '../home/home';

export const IngredientPage: FC = () => {

  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
  let { id } = useParams();
  const currentIngredient = ingredients.find((item: IIngredient) => item._id === id);
  const location = useLocation();

  return (
    <>
      {location.state?.from === "/"
        ?
        (<HomePage />)
        : (
          currentIngredient && (
            <div className={styles.wrapper}>
              <IngredientDetails />
            </div>
          )
        )}
    </>
  )
};