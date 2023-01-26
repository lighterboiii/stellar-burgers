import React from 'react';
import styles from './home.module.css';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import { getIngredientsData } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { changeIngredientModalStatus, changeOrderModalStatus } from '../../services/actions/modal';

export function HomePage() {
  const dispatch = useDispatch();
  // order modal status
  const isOrderModalOpen = useSelector(state => state.modalState.isOrderDetailsModalOpen);
  // get ingredients data from server
  React.useEffect(() => {
    dispatch(getIngredientsData())
  }, [dispatch]);
  // popup closing func
  const closePopup = () => {
    isOrderModalOpen ? dispatch(changeOrderModalStatus(false)) : dispatch(changeIngredientModalStatus(false));
  }

  return (
    <main className={styles.main}>
      <BurgerIngredients closePopup={closePopup} />
      <BurgerConstructor closePopup={closePopup} />
    </main>
  )
}