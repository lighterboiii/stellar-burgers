import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsData } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { changeIngredientModalStatus, changeOrderModalStatus } from '../../services/actions/modal.js';

function App() {
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
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients closePopup={closePopup}/>
          <BurgerConstructor closePopup={closePopup}/>
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
