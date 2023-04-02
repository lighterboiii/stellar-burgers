import styles from './SelectedIngredient.module.css';
import { useSelector, useDispatch } from '../../../services/hooks';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from "react-dnd";
import { FC } from 'react';
import { deleteIngredient, IIngredient } from '../../../services/actions/ingredientsActions';
import { Reorder } from 'framer-motion';

interface ISelectedIngredient {
  ingredient: IIngredient;
}

const SelectedIngredient: FC<ISelectedIngredient> = ({ ingredient }) => {

  const dispatch = useDispatch();
  const { image, name, price } = ingredient;
  const selectedIngredients = useSelector((store) => store.ingredientsReducer.selectedIngredients);

  const handleDeleteIngredient = (item: IIngredient) => {
    const selectedIndex = selectedIngredients.indexOf(item)
    const newIngredientsArray = selectedIngredients.slice();
    newIngredientsArray.splice(selectedIndex, 1);
    dispatch(deleteIngredient(newIngredientsArray));
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'selected',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'selected',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    }
  });

  return (
    <Reorder.Item whileDrag={{ opacity: 0.5 }} value={ingredient} className={'mb-4 ml-4 mr-1 ' + styles.element} >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        thumbnail={image}
        price={price}
        handleClose={() => handleDeleteIngredient(ingredient)}
      />
    </Reorder.Item>  
  )
};

export { SelectedIngredient };