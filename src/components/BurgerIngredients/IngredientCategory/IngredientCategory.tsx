import Ingredient from "../Ingredient/Ingredient";
import { forwardRef } from 'react';
import { IIngredient } from "../../../services/actions/ingredientsActions";

interface IIngredientCategory {
  category: Array<IIngredient>;
  heading: string;
  listStyle: string;
  textStyle: string;
}
type ref = HTMLDivElement;

const IngredientCategory = forwardRef<ref, IIngredientCategory>((
  { category, heading, listStyle, textStyle }, ref) => {

  return (
    <div ref={ref}>
      <h3 className={textStyle}>{heading}</h3>
      <ul className={listStyle}>
        {category.map((element) => {
          return (
            <Ingredient
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