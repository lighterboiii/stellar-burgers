import OrderPageItem from "../OrderPageItem/OrderPageItem";
import styles from './BurgerContains.module.css';
import PropTypes from 'prop-types';

export function BurgerContains({ ingredients }) {

  function counter(ingredient) {
    let counter = 0;
    ingredients.forEach((el) => {
      if (el._id === ingredient._id) {
        counter += 1;
      }
    })
    return counter;
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.list + ' custom-scroll'}>
        {ingredients.map((ingredient) => {
          return (
            <OrderPageItem counter={counter(ingredient)} ingredient={ingredient} />
          )
        })}
      </ul>
    </div>
  );
}

BurgerContains.propTypes = {
  ingredients: PropTypes.array.isRequired
}