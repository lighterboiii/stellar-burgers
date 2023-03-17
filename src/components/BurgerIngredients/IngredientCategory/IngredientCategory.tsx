import Ingredient from "../Ingredient/Ingredient";
import { FC, forwardRef } from 'react';
import { IIngredient } from "../../../services/actions/ingredients";

interface IIngredientCategory {
  category: Array<IIngredient>;
  heading: string;
  listStyle: string;
  textStyle: string;
}

const IngredientCategory: FC<IIngredientCategory> = forwardRef((
  { category, heading, listStyle, textStyle }, ref) => {

  return (
    <div ref={ref}>
      <h3 className={textStyle}>{heading}</h3>
      <ul className={listStyle}>
        {category.map((element) => {
          return (
            <Ingredient
              count={0}
              ingredient={element}
              key={element._id}
            />
          )
        }
        )}
      </ul>
    </div>
  )
});

export default IngredientCategory;