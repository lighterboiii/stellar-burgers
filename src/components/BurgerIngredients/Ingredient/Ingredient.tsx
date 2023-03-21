import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { useDrag } from "react-dnd";
import styles from './Ingredient.module.css';
import { v4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { changeIngredientModalStatus } from "../../../services/actions/modal";
import { currentIngredient } from "../../../services/actions/ingredients";
import { MouseEvent, FC } from "react";
import { IIngredient } from "../../../services/actions/ingredients";
import { TIngredientsState } from "../../../services/reducers/ingredientsReducer";
import { Link, useLocation } from "react-router-dom";

interface IIngredientComponent {
  ingredient: IIngredient;
}

const Ingredient: FC<IIngredientComponent> = ({ ingredient }) => {
  const { image, name, price, _id } = ingredient;
  const burgerData = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.ingredients);
  const selectedIngredients = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.selectedIngredients);
  const dispatch = useDispatch();
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const handleIngClick = (evt: MouseEvent) => {
    const id = evt.currentTarget.id
    const current = burgerData.find(element => element._id === id)
    dispatch(currentIngredient(current));
    dispatch(changeIngredientModalStatus(true));
  };

  let counter = 0;
  selectedIngredients.forEach((ingredient: IIngredient) => {
    ingredient.name === name && (ingredient.type === 'bun' ? counter += 2 : counter += 1);
  });

  return (
    <li id={_id} key={v4()} className={`${styles.listItem} ${isDrag && styles.dragging}`} onClick={handleIngClick} ref={dragRef} >
      {counter > 0 && <Counter count={counter} size={'default'} />}
      <Link to={`/ingredients/${ingredient._id}`} state={{ locationIngredientPage: location }} className={styles.link}>
        <img src={image} alt={name} className={'mr-4 ml-4'} />
        <p className={'mt-1 mb-1 text text_type_digits-default text_color_primary ' + styles.paragraph}>
          <span className={'pr-2'}>{price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p className={'text text_type_main-default text_color_primary ' + styles.bunName}>
          {name}
        </p>
      </Link>
    </li>
  );
};

export default Ingredient;