import styles from './OrderPageItem.module.css';
import PropTypes from 'prop-types';
import { IngredientPropTypes } from '../../utils/constants';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderPageItem({ ingredient, counter }) { 

  return (
    <li className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name}
          />
        </div>
        <p className={'text text_type_main-default ' + styles.name}>
          {ingredient.name}
        </p>
      </div>
      <div className={styles.price}>
        <p className='text text_type_digits-default'>{`${counter} x ${ingredient.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}

OrderPageItem.propTypes = {
  ingredient: IngredientPropTypes,
  counter: PropTypes.number.isRequired
}