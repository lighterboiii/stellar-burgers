import styles from './OrderImagesList.module.css';
import PropTypes from 'prop-types';
import { OrderIngredientImage } from "../OrderIngredientImage/OrderIngredientImage";

export function OrderImagesList({ ingredients }) {

  function showMore() {
    if (ingredients.length - 6 === 0) {
      return false
    } return true;
  }

  return (
    <ul className={styles.list}>
      {/* ругается на отсутствие ожидаемого коллбека функции */}
      {/* eslint-disable */}
      {ingredients.map((el, index) => {
        if (index === 5) {
          return (
            <OrderIngredientImage
              length={ingredients.length}
              ingredient={el}
              showMore={showMore()}
              index={index}
              key={index}
            />
          )
        } else if (index < 5) {
          return (
            <OrderIngredientImage
              length={ingredients.length}
              ingredient={el}
              showMore={false}
              index={index}
              key={index}
            />
          )
        }
      })
      }
    </ul>
  )
}
{/* eslint-enable */ }

OrderImagesList.propTypes = {
  ingredients: PropTypes.array.isRequired
}