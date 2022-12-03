import styles from './BurgerIngredients.module.css';
import IngredientCategory from './IngredientCategory/IngredientCategory';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';


function BurgerIngredients({data, setCurrentIngredient, setShowIngredientPopup}) {
	const textStyle = 'text text_type_main-medium text_color_primary pb-6'; 
	const buns = useMemo(() => data.filter((item) => item.type === 'bun'), [data]);
	const mains = useMemo(() => data.filter((item) => item.type === 'main'), [data]);
	const sauces = useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);

	const [current, setCurrent] = useState('one');

	const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

	const handleClick = (value) => {
    setCurrent(value);
    switch (value) {
      case 'one': {
        bunRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        break;
      }
      case 'two': {
        sauceRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        break;
      }
      case 'three': {
        mainRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        break;
      }
    }
  };

	return (
		<section className={styles.ingredients}>
      <h2 className={'text text_type_main-large text text_color_primary mt-10 mb-5'}>Соберите бургер</h2>
      <div className={styles.tabs + ' pb-10'}>
        <Tab value='one' active={current === 'one'} onClick={handleClick}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={handleClick}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={handleClick}>
          Начинки
        </Tab>
      </div>
			<div className={styles.wrapper}>
				<div className={styles.scroll + ' custom-scroll'}>
					<IngredientCategory ref={bunRef}
						setShowIngredientPopup={setShowIngredientPopup}
						setCurrentIngredient={setCurrentIngredient}
					  category={buns} heading={'Булки'} listStyle={'pl-4 pr-4 ' + styles.list} textStyle={textStyle} 
						data={data}/>
					<IngredientCategory ref={sauceRef}
						setShowIngredientPopup={setShowIngredientPopup}
						setCurrentIngredient={setCurrentIngredient}
					  category={sauces} heading={'Соусы'} listStyle={'pl-4 pr-4 ' + styles.list} textStyle={textStyle + ' pt-10'} 
					  data={data}/>
					<IngredientCategory ref={mainRef}
						setShowIngredientPopup={setShowIngredientPopup} 
						setCurrentIngredient={setCurrentIngredient}
						category={mains} heading={'Начинки'} listStyle={'pl-4 pr-4 pb-8 ' + styles.list} textStyle={textStyle + ' pt-10'} 
						data={data}/>
				</div>
			</div>
		</section>
	)
}

BurgerIngredients.propTypes = { 
	data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	setCurrentIngredient: PropTypes.func.isRequired,
	setShowIngredientPopup: PropTypes.func.isRequired
 };

export default BurgerIngredients;

