import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsData } from '../../services/actions/ingredients';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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
import { FeedPage } from '../../pages/feed/feed';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData())
  }, [dispatch]);

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<AuthRoute element={<RegisterPage />} to={'/'} />} />
            <Route path="/forgot-password" element={<ForgotPage />} />
            <Route path="/reset-password" element={<ResetPage />} />
            <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} to={'/login'} />} />
            <Route path='/feed' element={<FeedPage />}>
              <Route path='/feed/:id' /> {/* Айди заказа */}
            </Route> {/* Лента заказов */}
            <Route path='/profile/orders'>
              <Route path='/profile/orders/:id' /> {/* must be protected route */}
            </Route>  {/* must be protected route */}
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
