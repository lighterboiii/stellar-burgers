import PropTypes from 'prop-types';
import Ingredient from "../Ingredient/Ingredient";

function IngredientCategory({ data, category, heading, listStyle, textStyle, setShowIngredientPopup, setCurrentIngredient }) {

  const handleIngClick = (evt) => {
    const id = evt.currentTarget.id
    const current = data.find(element => element._id === id);
    setCurrentIngredient(current)
    setShowIngredientPopup(true)
  }

  return (
    <div>
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
}


IngredientCategory.propTypes = { 
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  category: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  heading: PropTypes.string.isRequired,
  listStyle: PropTypes.string.isRequired,
  textStyle: PropTypes.string.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
  setShowIngredientPopup: PropTypes.func.isRequired
 }

export default IngredientCategory;