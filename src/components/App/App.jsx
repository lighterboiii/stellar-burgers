import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPage } from '../../pages/forgot/forgot-password';
import { ResetPage } from '../../pages/reset/reset-password';
import { PageNotfound } from '../../pages/404/404';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

function App() {

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <Routes>
            <Route path='/' element={<HomePage />} exact={true} />
            <Route path="/login" element={<LoginPage />} exact={true} />
            <Route path="/register" element={<RegisterPage />} exact={true} />
            <Route path="/forgot-password" element={<ForgotPage />} exact={true} />
            <Route path="/reset-password" element={<ResetPage />} exact={true} />
            <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} exact={true} />
            <Route path="/ingredients/:id" exact={true} />
            <Route path='*' element={<PageNotfound />} />
          </Routes>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
