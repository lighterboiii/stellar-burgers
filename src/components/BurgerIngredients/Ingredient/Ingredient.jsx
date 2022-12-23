import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  OPEN_INGREDIENT_INFO
} from '../../../services/actions/actions';


function Ingredient({ ingredient, setShowIngredientPopup }) {
  const { image, name, price, count, id } = ingredient;
  const burgerData = useSelector(state => state.ingredients.ingredients);
  const dispatch = useDispatch();
  console.log(ingredient)
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
    dispatch({
      type: OPEN_INGREDIENT_INFO,
      payload: current
    })
    setShowIngredientPopup(true)
  };

  return (
    <li id={id} key={id} className={`${styles.listItem} ${isDrag && styles.dragging}`} onClick={handleIngClick} ref={dragRef} >
      <Counter count={count} size={'default'} />
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
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  handleIngClick: PropTypes.func.isRequired
}

export default Ingredient;