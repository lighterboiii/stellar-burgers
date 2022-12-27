import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../utils/burger-api.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_INGREDIENTS_SUCCESS
} from '../../services/actions/ingredients';
import { changeIngredientModalStatus, changeOrderModalStatus } from '../../services/actions/modal.js';

function App() {
  const dispatch = useDispatch();

  const isOrderModalOpen = useSelector(state => state.modalState.isOrderDetailsModalOpen);

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
