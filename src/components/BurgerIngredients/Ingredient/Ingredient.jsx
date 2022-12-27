import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  OPEN_INGREDIENT_INFO
} from '../../../services/actions/ingredients';
import { changeIngredientModalStatus } from "../../../services/actions/modal";
import { currentIngredient } from "../../../services/actions/ingredients";


function Ingredient({ ingredient }) {
  const { image, name, price, _id } = ingredient;
  const burgerData = useSelector(state => state.ingredients.ingredients);
  const selectedIngredients = useSelector(state => state.ingredients.selectedIngredients);
  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
		collect: monitor => ({
				isDrag: monitor.isDragging()
		})
	});

  const handleIngClick = (evt) => {
    const id = evt.currentTarget.id
    const current = burgerData.find(element => element._id === id)
    dispatch(currentIngredient(current));
    dispatch(changeIngredientModalStatus(true));
  };

  let counter = 0;
  selectedIngredients.forEach(ingredient => {
    ingredient.name === name && (ingredient.type === 'bun' ? counter += 2 : counter += 1);
  });


  return (
    <li id={_id} key={_id} className={`${styles.listItem} ${isDrag && styles.dragging}`} onClick={handleIngClick} ref={dragRef} >
      {counter > 0 && <Counter count={counter} size={'default'} />}
      <img src={image} alt={name} className={'mr-4 ml-4'} />
      <p className={'mt-1 mb-1 text text_type_digits-default text_color_primary ' + styles.paragraph}>
        <span className={'pr-2'}>{price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={'text text_type_main-default text_color_primary ' + styles.bunName}>
        {name}
      </p>
    </li>
  );
}

Ingredient.propTypes = { 
  ingredient: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  setShowIngredientPopup: PropTypes.func.isRequired
}

export default Ingredient;