import styles from './IngredientDetails.module.css'
import { useSelector } from 'react-redux';

function IngredientDetails() {
  const currentIngredient = useSelector(state => state.ingredients.currentIngredient);

  return (
    <div className={styles.wrapper + ' pb-15 pl-10 pr-10'} currentingredient={currentIngredient._id}>
      <img src={currentIngredient.image_large} alt={currentIngredient.name} />
      <h4 className={'mt-4 mb-8 text text_type_main-medium ' + styles.title}>{currentIngredient.name}</h4>
      <ul className={styles.options}>
        <li className={styles.characts}>
          <span className={'text text_color_inactive text_type_main-default'}>Калории,ккал</span>
          <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.calories}</span>
        </li>
        <li className={styles.characts}>
        <span className={'text text_color_inactive text_type_main-default'}>Белки,г</span>
          <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.proteins}</span>
        </li>
        <li className={styles.characts}>
        <span className={'text text_color_inactive text_type_main-default'}>Жиры,г</span>
          <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.fat}</span>
        </li> 
        <li className={styles.characts}>
        <span className={'text text_color_inactive text_type_main-default'}>Углеводы,г</span>
          <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;