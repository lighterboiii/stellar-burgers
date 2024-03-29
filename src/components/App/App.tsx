import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsData } from '../../services/actions/ingredientsActions';
/* eslint-disable*/
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
/* eslint-enable */
import { useDispatch, useSelector } from '../../services/hooks';
import { FC, useEffect } from 'react';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPage } from '../../pages/forgot/forgot-password';
import { ResetPage } from '../../pages/reset/reset-password';
import { PageNotfound } from '../../pages/404/404';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { IngredientPage } from '../../pages/ingredient/IngredientPage';
import { ProfileFeedPage } from '../../pages/profile-feed/profile-feed';
import { FeedPage } from '../../pages/feed/feed';
import { getUserInfo } from '../../services/actions/userActions';
import { getCookie } from '../../utils/cookie';
import { OrderPage } from '../../pages/order-page/order-page';
import BurgerOrderDetails from '../BurgerOrderDetails/BurgerOrderDetails';
import { Modal } from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user } = useSelector((store) => store.userReducer);
  const access = getCookie("accessToken");

  const closePopup = () => {
    return navigate(-1);
  }

  useEffect(() => {
    dispatch(getIngredientsData());
    if (access) {
      dispatch(getUserInfo());
    }
  }, [dispatch, access]);

  const background =
    location.state?.locationFeedList ||
    location.state?.locationIngredientPage ||
    location.state?.locationProfileFeed ||
    location;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background}>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={(!user && !access) ? <LoginPage /> : <Navigate to={'/'} />} />
          <Route path="/register" element={(!user && !access) ? <RegisterPage /> : <Navigate to={'/'} />} />
          <Route path="/forgot-password" element={(!user && !access) ? <ForgotPage /> : <Navigate to={'/'} />} />
          <Route path="/reset-password" element={<ResetPage />} />
          <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} >
            <Route path='orders' element={<ProfileFeedPage />} />
          </Route>
          <Route path='/profile/orders/:id' element={(!user && !access) ? <LoginPage /> : <OrderPage isLogin={true} />} />
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/feed/:id' element={<OrderPage isLogin={false} />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<PageNotfound />} />
        </Routes>
        {location.state?.locationIngredientPage && (
        <Routes>
          <Route path="/ingredients/:id" element={
              <Modal closePopup={closePopup} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            } />
        </Routes>
      )}
        {location.state?.locationFeedList && (
          <Routes>
            <Route path="/feed/:id" element={
              <Modal closePopup={closePopup}>
                <BurgerOrderDetails />
              </Modal>
            } />
          </Routes>
        )}
        {location.state?.locationProfileFeed && (
          <Routes>
            <Route path="/profile/orders/:id" element={
              <Modal closePopup={closePopup}>
                <BurgerOrderDetails />
              </Modal>
            } />
          </Routes>
        )}
      </div>
    </DndProvider>
  );
}

export default App;
