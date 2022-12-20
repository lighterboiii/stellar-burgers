import React from 'react';
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
  GET_INGREDIENTS
} from '../../services/actions/actions';

function App() {
  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.ingredients.orderDetails);
  const [showIngredientPopup, setShowIngredientPopup] = React.useState(false);
  const [showOrderPopup, setShowOrderPopup] = React.useState(false);

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
          <main className={styles.main}>
            <BurgerIngredients setShowIngredientPopup={setShowIngredientPopup} />
            <BurgerConstructor setShowOrderPopup={setShowOrderPopup} />
          </main>
          {showOrderPopup && orderDetails && (
            <Modal title={''} closePopup={setShowOrderPopup}>
              <OrderDetails />
            </Modal>
          )}
        {showIngredientPopup && (
          <Modal title={'Детали ингредиента'} closePopup={setShowIngredientPopup} >
            <IngredientDetails />
          </Modal>
        )}
    </div>
  );
}

export default App;
