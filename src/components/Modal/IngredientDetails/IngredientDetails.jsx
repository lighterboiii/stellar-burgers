import styles from './IngredientDetails.module.css'

function IngredientDetails({ data, title, currentIngredient }) {
  console.log(currentIngredient)
  return (
    <div className={styles.wrapper + ' pb-15 pl-10 pr-10'}>
      <img src={currentIngredient.image} alt={currentIngredient.name} />
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

export default IngredientDetails