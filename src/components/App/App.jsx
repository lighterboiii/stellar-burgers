import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import styles from './App.module.css';
// import data from '../utils/data';

function App() {
  const dataApi = 'https://norma.nomoreparties.space/api/ingredients';
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(dataApi)
    .then(res => res.json())
    .then((res) => {
      setData(res.data)
    })
    .catch(e => {
      console.log(e)
    })
  })


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;
