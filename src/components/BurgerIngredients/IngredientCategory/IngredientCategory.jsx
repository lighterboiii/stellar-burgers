import PropTypes from 'prop-types';
import Ingredient from "../Ingredient/Ingredient";
import { forwardRef } from 'react';

const IngredientCategory = forwardRef((
  { category, heading, listStyle, textStyle, setShowIngredientPopup }, ref) => {

  return (
    <div ref={ref}>
      <h3 className={textStyle}>{heading}</h3>
      <ul className={listStyle}>
        {category.map((element) => {
          return (
            <Ingredient
              count={0}
              ingredient={element}
              setShowIngredientPopup={setShowIngredientPopup}
            />
          )
        }
        )}
      </ul>
    </div>
  )
})


IngredientCategory.propTypes = {
  category: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  heading: PropTypes.string.isRequired,
  listStyle: PropTypes.string.isRequired,
  textStyle: PropTypes.string.isRequired,
  setShowIngredientPopup: PropTypes.func.isRequired
}

export default IngredientCategory;