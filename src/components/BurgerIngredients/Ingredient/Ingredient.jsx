import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';

function Ingredient({ image, alt, price, count, setShowIngredientPopup, setCurrentIngredient, _id, handleIngClick }) {

  return (
    <li id={_id} key={_id} className={styles.listItem} onClick={handleIngClick}>
      <Counter count={count} size={'default'} />
      <img src={image} alt={alt} className={'mr-4 ml-4'} />
      <p className={'mt-1 mb-1 text text_type_digits-default text_color_primary ' + styles.paragraph}>
        <span className={'pr-2'}>{price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={'text text_type_main-default text_color_primary ' + styles.bunName}>
        {alt}
      </p>
    </li>
  );
}

Ingredient.propTypes = { 
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

export default Ingredient;