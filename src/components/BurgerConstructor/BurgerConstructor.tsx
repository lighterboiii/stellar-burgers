import styles from './BurgerConstructor.module.css';
import { v4 } from 'uuid';
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

  const userData = useSelector((state: { userInfo: IUserData }) => state.userInfo.user);
  const burgerData = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.ingredients); // исправить
  const selectedIngredients = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.selectedIngredients); // исправить
  const isOrderModalOpen = useSelector(state => state.modalState.isOrderDetailsModalOpen);

  const notBun = useMemo(() => selectedIngredients.filter((ingredient: IIngredient) => ingredient.type !== 'bun'), [selectedIngredients]);
  const bun = useMemo(() => selectedIngredients.find((ingredient: IIngredient) => ingredient.type === 'bun'), [selectedIngredients]);
  const bunElement = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.bunElement);

  const sum = useMemo(() => {
    return selectedIngredients.reduce(
      (acc: any, ingredient: IIngredient) =>
        ingredient === bun ? acc + ingredient.price * 2 : acc + ingredient.price, 0);
  }, [selectedIngredients, bun]);

  const handleDrop = (item: IIngredient) => {
    const selectedIngredient = burgerData.find((ingredient: IIngredient) => ingredient._id === item._id);
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
      item.uniqueId = v4();
      handleDrop(item);
    },
  });

  const onOrderClick = () => {
    const dataId = notBun.map((element: IIngredient) => element._id);
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
      {selectedIngredients.length > 0 && bunElement ?
        <div className={'mr-4 ' + styles.total}>
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{sum}{<CurrencyIcon type='primary' />}</span>
          <Button size="large" type="primary" htmlType='button' onClick={onOrderClick}>Оформить заказ</Button>
        </div> :
        <div className={'mr-4 ' + styles.total}>
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>{sum}{<CurrencyIcon type='primary' />}</span>
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