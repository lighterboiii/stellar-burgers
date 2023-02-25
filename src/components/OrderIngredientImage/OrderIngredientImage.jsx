import styles from './OrderIngredientImage.module.css';
import PropTypes from 'prop-types';
import { IngredientPropTypes } from '../../utils/constants';

export function OrderIngredientImage({ showMore, length, ingredient, index }) {

  return (
    <li className={styles.element} style={{ zIndex: 20 - index }} > 
      <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name} />
      {showMore && (
        <p className={'text text_type_digits-default ' + styles.text}>{`+${length - 6}`}</p>
      )}
    </li>
  )
}

OrderIngredientImage.propTypes = {
  ingredient: IngredientPropTypes,
  index: PropTypes.number.isRequired,
  showMore: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired
}