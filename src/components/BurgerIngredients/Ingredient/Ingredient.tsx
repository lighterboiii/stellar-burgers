import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { useDrag } from "react-dnd";
import styles from './Ingredient.module.css';
import { useDispatch, useSelector } from "../../../services/hooks";
import { changeIngredientModalStatus } from "../../../services/actions/modalActions";
import { currentIngredient } from "../../../services/actions/ingredientsActions";
import { MouseEvent, FC, useMemo } from "react";
import { IIngredient } from "../../../services/actions/ingredientsActions";
import { Link, useLocation } from "react-router-dom";

interface IIngredientComponent {
  ingredient: IIngredient;
}

const Ingredient: FC<IIngredientComponent> = ({ ingredient }) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const { image, name, price, _id } = ingredient;
  const { bunElement, ingredients, selectedIngredients } = useSelector((store) => store.ingredientsReducer);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const handleIngClick = (evt: MouseEvent<HTMLLIElement>) => {
    const id = evt.currentTarget.id
    const current = ingredients.find((element: IIngredient) => element._id === id)
    dispatch(currentIngredient(current));
    dispatch(changeIngredientModalStatus(true));
  };

  interface IGetCounter {
    [counters: string]: number;
  }

  const counter = useMemo(() => {
    const getCounter: IGetCounter = {};
    ingredients.forEach((ingredient: IIngredient) => {
      getCounter[ingredient._id] =
        selectedIngredients.filter((item: IIngredient) => item._id === ingredient._id).length;
    })
    if (bunElement) {
      getCounter[bunElement._id] = 2;
    }
    return getCounter;
  }, [ingredients, selectedIngredients, bunElement]);
  const addCounter = (ingredientId: string) => counter[ingredientId];

  return (
    <li id={_id} className={`${styles.listItem} ${isDrag && styles.dragging}`} onClick={handleIngClick} ref={dragRef} >
      {addCounter(ingredient._id) !== 0 && <Counter count={addCounter(ingredient._id)} size={'default'} />}
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