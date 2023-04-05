import styles from './home.module.css';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import { useDispatch, useSelector } from '../../services/hooks';
import { changeIngredientModalStatus, changeOrderModalStatus } from '../../services/actions/modalActions';
import { FC } from 'react';

export const HomePage: FC = () => {
  const dispatch = useDispatch();

  const isOrderModalOpen = useSelector((store) => store.modalReducer.isOrderDetailsModalOpen);

  const closePopup = () => {
    isOrderModalOpen ? dispatch(changeOrderModalStatus(false)) : dispatch(changeIngredientModalStatus(false));
  }

  return (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor closePopup={closePopup} />
    </main>
  )
};