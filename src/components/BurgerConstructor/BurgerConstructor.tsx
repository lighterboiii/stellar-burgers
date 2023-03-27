import styles from './BurgerConstructor.module.css';
import { v4 as uuidv4 } from 'uuid';
import { TopBun } from './TopBun/TopBun';
import { BottomBun } from './BottomBun/BottomBun';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { setOrderData } from "../../services/actions/orderActions";
import { IIngredient, selectBunIngredient, selectIngredient } from '../../services/actions/ingredientsActions';
import { useMemo, FC } from "react";
import { changeOrderModalStatus } from "../../services/actions/modalActions";
import { deleteAllIngredients } from '../../services/actions/ingredientsActions';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrop } from "react-dnd"
import { SelectedIngredient } from "./SelectedIngredient/SelectedIngredient";
import { Modal } from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
import { useNavigate } from 'react-router-dom';
import { IUserData } from '../../services/actions/userActions';
import { TIngredientsState } from '../../services/reducers/ingredientsReducer';

interface IBurgerConstructor {
  closePopup: () => void;
};

const BurgerConstructor: FC<IBurgerConstructor> = ({ closePopup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.userReducer.user);
  const { bunElement, ingredients, selectedIngredients } = useSelector((store) => store.ingredientsReducer);
  const isOrderModalOpen = useSelector((store) => store.modalReducer.isOrderDetailsModalOpen);
  
  const bunPrice = useMemo(() => {
    return bunElement === undefined ? 0 : bunElement.price * 2;
  }, [bunElement]);
  const ingredientsPrice = useMemo(() => {
    return selectedIngredients.reduce((acc: any, ingredient: IIngredient) => acc + ingredient.price, 0);
  }, [selectedIngredients])
  const totalPrice = useMemo(() => {
    return bunElement === undefined ? ingredientsPrice : bunPrice + ingredientsPrice;
  }, [bunPrice, ingredientsPrice, bunElement])


  const handleDrop = (item: IIngredient) => {
    const selectedIngredient = ingredients.find((ingredient: IIngredient) => ingredient._id === item._id);
    if (selectedIngredient?.type !== "bun") {
      dispatch(selectIngredient(selectedIngredients, selectedIngredient))
    } else {
      dispatch(selectBunIngredient(selectedIngredient))
    }
  };

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item: any) {
      item.uniqueId = uuidv4();
      handleDrop(item);
    },
  });

  const onOrderClick = () => {
    const dataId = selectedIngredients.map((element: IIngredient) => element._id);
    const buns = new Array(2).fill(bunElement);
    const dataIds = buns.map((el) => el._id)
    dataIds.splice(1, 0, ...dataId)
    if (!userData) {
      navigate('/login');
    } else {
      dispatch(setOrderData(dataIds));
      dispatch(changeOrderModalStatus(true));
      dispatch(deleteAllIngredients());
    }
  };

  return (
    <section className={`${styles.section} ${isHover && styles.dropping}`} ref={dropRef}>
      <div className={`mb-10 mt-25`}>
        <TopBun />
        <ul className={'text custom-scroll ' + styles.list}>
          {selectedIngredients.map((element: IIngredient, index: number) => (
            <SelectedIngredient
              ingredient={element}
              index={index} key={element.uniqueId}
            />
          ))
          }
        </ul>
        <BottomBun />
      </div>
      {bunElement ?
        <div className={'mr-4 ' + styles.total}>
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{totalPrice}{<CurrencyIcon type='primary' />}</span>
          <Button size="large" type="primary" htmlType='button' onClick={onOrderClick}>Оформить заказ</Button>
        </div> :
        <div className={'mr-4 ' + styles.total}>
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{totalPrice}{<CurrencyIcon type='primary' />}</span>
          <Button size="large" type="secondary" htmlType='button' disabled onClick={onOrderClick}>Оформить заказ</Button>
        </div>
      }
      {isOrderModalOpen && (
        <Modal title={''} closePopup={closePopup}>
          <OrderDetails />
        </Modal>
      )}
    </section>

  )
};

export default BurgerConstructor;