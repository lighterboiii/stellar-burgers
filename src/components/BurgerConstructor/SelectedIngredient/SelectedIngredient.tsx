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
    },
    // hover: (item: any, monitor) => {
    //   // if (!ref.current) {
    //   //   return
    //   // }
    //   const dragIndex = item.index;
    //   const hoverIndex = index;

    //   const hoverBoundingRect = ref?.current!.getBoundingClientRect();
    //   const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //   const clientOffset = monitor.getClientOffset();
    //   const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

    //   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //     return
    //   }
    //   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //     return
    //   }
    //   // if (dragIndex === hoverIndex) {
    //   //   return 
    //   // }
    //   dispatch(sortIngredients(dragIndex, hoverIndex, selectedIngredients));
    //   item.index = hoverIndex;
    // }
  });

  // const ref = useRef<HTMLLIElement>(null);
  // const dragDropRef: any = dragRef(dropRef(ref));
  // const opacity = isDragging ? 0 : 1;

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