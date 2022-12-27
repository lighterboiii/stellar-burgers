import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails.jsx';
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../Modal/OrderDetails/OrderDetails.jsx';
import { getIngredients } from '../../utils/burger-api.js';
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_INGREDIENTS_SUCCESS
} from '../../services/actions/ingredients';
import { changeIngredientModalStatus, changeOrderModalStatus } from '../../services/actions/modal.js';

function App() {
  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.orderData.orderDetails);
  const currentIngredient = useSelector(state => state.ingredients.currentIngredient);
  const isIngredientModalOpen = useSelector(state => state.modalState.isIngredientModalOpen);
  const isOrderDetailsModalOpen = useSelector(state => state.modalState.isOrderDetailsModalOpen);

  React.useEffect(() => {
    getIngredients()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data
        })
      })
      .catch(e => {
        console.log(e)
      })
  }, [dispatch]);

  const closePopup = () => {
    isOrderDetailsModalOpen ? dispatch(changeOrderModalStatus(false)) : dispatch(changeIngredientModalStatus(false));
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
      {isOrderDetailsModalOpen && orderDetails && (
        <Modal title={''} closePopup-={closePopup}>
          <OrderDetails />
        </Modal>
      )}
      {isIngredientModalOpen && (
        <Modal title={'Детали ингредиента'} closePopup={closePopup}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
