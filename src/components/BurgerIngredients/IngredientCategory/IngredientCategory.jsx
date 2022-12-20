import PropTypes from 'prop-types';
import Ingredient from "../Ingredient/Ingredient";
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SELECT_INGREDIENT
} from '../../../services/actions/actions';

const IngredientCategory = forwardRef((
  { category, heading, listStyle, textStyle, setShowIngredientPopup }, ref) => {
  const burgerData = useSelector(state => state.ingredients.ingredients);

  const dispatch = useDispatch();

  const handleIngClick = (evt) => {
    const id = evt.currentTarget.id
    const current = burgerData.find(element => element._id === id)
    dispatch({
      type: SELECT_INGREDIENT,
      payload: current
    })
    setShowIngredientPopup(true)
  };

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
  setShowIngredientPopup: PropTypes.func.isRequired
}

export default IngredientCategory;