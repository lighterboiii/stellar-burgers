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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPage } from '../../pages/forgot/forgot-password';
import { ResetPage } from '../../pages/reset/reset-password';
import { PageNotfound } from '../../pages/404/404';

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
    <Router>
      <Switch>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.app}>
            <AppHeader />
            <Route path="/" exact={true}>
              <main className={styles.main}>
                <BurgerIngredients closePopup={closePopup} />
                <BurgerConstructor closePopup={closePopup} />
              </main>
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/register" exact={true}>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPage />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPage />
            </Route>
            <Route path="/profile" exact={true} />
            <Route path="/ingredients/:id" exact={true} />
            {/* <Route path="/*">
              <PageNotfound />
            </Route> */}
          </div>
        </DndProvider>
      </Switch>
    </Router>
  );
}

export default App;
