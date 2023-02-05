// import styles from './ingredientPage.module.css';
// import { useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';

// export const IngredientPage = () => {
//   let { id }  = useParams();

//   const ingredients = useSelector((state) => state.ingredients.ingredients);
//   console.log(ingredients)
//   const current = ingredients.find((el) => el._id === id);
//   console.log(current);
//   return (
//     <div className={styles.wrapper + ' pb-15 pl-10 pr-10'} key={current.id}>
//       <img src={current.image_large} alt={current.name} />
//       <h4 className={'text text_type_main-medium ' + styles.title}>{current.name}</h4>
//       <ul className={styles.options}>
//         <li className={styles.characts}>
//           <span className={'text text_color_inactive text_type_main-default'}>Калории,ккал</span>
//           <span className='text text_type_digits-default text_color_inactive'>{current.calories}</span>
//         </li>
//         <li className={styles.characts}>
//         <span className={'text text_color_inactive text_type_main-default'}>Белки,г</span>
//           <span className='text text_type_digits-default text_color_inactive'>{current.proteins}</span>
//         </li>
//         <li className={styles.characts}>
//         <span className={'text text_color_inactive text_type_main-default'}>Жиры,г</span>
//           <span className='text text_type_digits-default text_color_inactive'>{current.fat}</span>
//         </li> 
//         <li className={styles.characts}>
//         <span className={'text text_color_inactive text_type_main-default'}>Углеводы,г</span>
//           <span className='text text_type_digits-default text_color_inactive'>{current.carbohydrates}</span>
//         </li>
//       </ul>
//     </div>
//   )
// }