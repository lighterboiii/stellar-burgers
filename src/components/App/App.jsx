import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails.jsx';
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../Modal/OrderDetails/OrderDetails.jsx';
import { getIngredients } from '../../utils/burger-api.js';
import styles from './App.module.css';
import { OrderContext } from '../../utils/OrderContext';
import { useDispatch } from 'react-redux';
import {
  GET_INGREDIENTS
} from '../../services/actions/actions';

function App() {
  const dispatch = useDispatch();

  const [showIngredientPopup, setShowIngredientPopup] = React.useState(false);
  const [showOrderPopup, setShowOrderPopup] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);
  const [orderDetails, setOrderDetails] = React.useState(null);

  React.useEffect(() => {
    getIngredients()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS,
          payload: res.data
      })
      })
      .catch(e => {
        console.log(e)
      })
  }, [dispatch])

  return (
    <div className={styles.app}>
      <AppHeader />
        <OrderContext.Provider value={{ orderDetails, setOrderDetails }}>
          <main className={styles.main}>
            <BurgerIngredients setShowIngredientPopup={setShowIngredientPopup} setCurrentIngredient={setCurrentIngredient} />
            <BurgerConstructor setShowOrderPopup={setShowOrderPopup} />
          </main>
          {showOrderPopup && orderDetails && (
            <Modal title={''} closePopup={setShowOrderPopup}>
              <OrderDetails />
            </Modal>
          )}
        </OrderContext.Provider>
        {showIngredientPopup && (
          <Modal title={'Детали ингредиента'} closePopup={setShowIngredientPopup} >
            <IngredientDetails currentIngredient={currentIngredient} />
          </Modal>
        )}
    </div>
  );
}

export default App;
