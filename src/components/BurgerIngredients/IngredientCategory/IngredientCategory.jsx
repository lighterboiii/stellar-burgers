import PropTypes from 'prop-types';
import Ingredient from "../Ingredient/Ingredient";
import { forwardRef, useContext } from 'react';
import { IngredientsContext } from '../../utils/IngredientsContext';

const IngredientCategory = forwardRef((
  { category, heading, listStyle, textStyle, setShowIngredientPopup, setCurrentIngredient }, ref) => {
  const burgerData = useContext(IngredientsContext);

  const handleIngClick = (evt) => {
    const id = evt.currentTarget.id
    const current = burgerData.find(element => element._id === id);
    setCurrentIngredient(current)
    setShowIngredientPopup(true)
  }

  return (
    <div ref={ref}>
      <h3 className={textStyle}>{heading}</h3>
      <ul className={listStyle}>
        {category.map((element) => {
          return (
            <Ingredient
              count={0}
              image={element.image}
              alt={element.name}
              price={element.price}
              key={element._id}
              id={element._id}
              setShowIngredientPopup={setShowIngredientPopup}
              setCurrentIngredient={setCurrentIngredient}
              handleIngClick={handleIngClick}
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
  setCurrentIngredient: PropTypes.func.isRequired,
  setShowIngredientPopup: PropTypes.func.isRequired
}

export default IngredientCategory;