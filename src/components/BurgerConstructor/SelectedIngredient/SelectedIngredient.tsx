import styles from './SelectedIngredient.module.css';
import { useSelector, useDispatch } from '../../../services/hooks';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from "react-dnd";
import { FC, useRef } from 'react';
import { v4 } from 'uuid';
import { deleteIngredient, IIngredient } from '../../../services/actions/ingredients';
import { TIngredientsState } from '../../../services/reducers/ingredientsReducer';

interface ISelectedIngredient {
  ingredient: IIngredient;
  index: number;
  moveIngredient:
  (dragIndex: number,
   hoverIndex: number,
   selectedIngredients: Array<IIngredient>) => void;
}

const SelectedIngredient: FC<ISelectedIngredient> = ({ ingredient, index, moveIngredient }) => {

  const dispatch = useDispatch();
  const { image, name, price } = ingredient;
  const selectedIngredients = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.selectedIngredients);

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
    },
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex, selectedIngredients);
      item.index = hoverIndex;
    }
  });

  const ref = useRef<HTMLLIElement>(null);
  const dragDropRef: any = dragRef(dropRef(ref)); //TODO убрать any?
  const opacity = isDragging ? 0 : 1;

  return (
    <li className={'mb-4 ml-4 mr-1 ' + styles.element} ref={dragDropRef} style={{ opacity }} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        thumbnail={image}
        price={price}
        handleClose={handleDeleteIngredient}
      />
    </li>
  )
};

export { SelectedIngredient };