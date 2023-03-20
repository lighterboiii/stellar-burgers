import { FC } from "react";
import { IIngredient } from "../../services/actions/ingredients";
import { OrderPageItem } from "../OrderPageItem/OrderPageItem";
import styles from './BurgerContains.module.css';

interface IBurgerContains {
  ingredients: Array<IIngredient>;
}

export const BurgerContains: FC<IBurgerContains> = ({ ingredients }) =>  {

  function counter(ingredient: IIngredient) {
    let counter = 0;
    ingredients.forEach((el) => {
      if (el._id === ingredient._id) {
        counter += 1;
      }
    })
    return counter;
  }

  const ingredientsList = Array.from(new Set(ingredients));

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.list + ' custom-scroll'}>
        {ingredientsList.map((ingredient) => {
          return (
            <OrderPageItem counter={counter(ingredient)} ingredient={ingredient} key={`${ingredient._id}`} />
          )
        })}
      </ul>
    </div>
  );
};