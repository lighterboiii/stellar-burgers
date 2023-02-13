import styles from './OrderIngredientImage.module.css';

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