import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPage } from '../../pages/forgot/forgot-password';
import { ResetPage } from '../../pages/reset/reset-password';
import { PageNotfound } from '../../pages/404/404';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { AuthRoute } from '../ProtectedRoute/ProtectedRoute';
import { IngredientPage } from '../../pages/ingredient/IngredientPage';
// import { changeIngredientModalStatus, changeOrderModalStatus } from '../../services/actions/modal';
// import Modal from '../Modal/Modal';
// import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';

function App() {
  // const isLogin = useSelector(state => state.userInfo.isLogin);
  // const token = useSelector((state) => state.userInfo.accessToken);
  // const userData = useSelector((state) => state.userInfo.user);
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const background = location.state && location.state.background;
  // const isOrderModalOpen = useSelector(state => state.modalState.isOrderDetailsModalOpen);
  // const closePopup = () => {
  //   isOrderModalOpen ? dispatch(changeOrderModalStatus(false)) : dispatch(changeIngredientModalStatus(false));
  // }

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <Routes>
            <Route path='/' element={<HomePage />} />
            {/* {(isLogin && token) 
              ? <Route path='/' element={<HomePage />} />
              : <Route path="/login" element={<LoginPage />} />
            } */}
            <Route path="/login" element={<AuthRoute element={<LoginPage />} to={'/'} />} /> 
            <Route path="/register" element={<AuthRoute element={<RegisterPage />} to={'/'} />}  />
            <Route path="/forgot-password" element={<ForgotPage />} />
            <Route path="/reset-password" element={<ResetPage />} />
            <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} to={'/login'}/>} />
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
