import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails.jsx';
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../Modal/OrderDetails/OrderDetails.jsx';
import { getIngredients } from '../utils.js/burger-api.js';
import styles from './App.module.css';

function App() {
  const [data, setData] = React.useState([]);
  const [showIngredientPopup, setShowIngredientPopup] = React.useState(false);
  const [showOrderPopup, setShowOrderPopup] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null)

  React.useEffect(() => {
    getIngredients()
      .then((res) => {
        setData(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} setShowIngredientPopup={setShowIngredientPopup} setCurrentIngredient={setCurrentIngredient} />
        <BurgerConstructor data={data} setShowOrderPopup={setShowOrderPopup}/>
      </main>
     {showIngredientPopup && ( 
      <Modal title={'Детали ингредиента'} closePopup={setShowIngredientPopup} >
        <IngredientDetails data={data} currentIngredient={currentIngredient}/>
      </Modal>
     )}
    {showOrderPopup && (
       <Modal title={''} closePopup={setShowOrderPopup}>
        <OrderDetails />
      </Modal> )}
    </div>
  );
}

export default App;
