import styles from './BurgerIngredients.module.css';
import IngredientsHeader from './IngredientsHeader/IngredientsHeader';
import IngredientCategory from './IngredientCategory/IngredientCategory';
import { useMemo } from 'react';
import PropTypes from 'prop-types';


function BurgerIngredients({data, setCurrentIngredient, setShowIngredientPopup}) {
	const textStyle = 'text text_type_main-medium text_color_primary pb-6'; 

	const buns = useMemo(() => data.filter((item) => item.type === 'bun'), [data]);
	const mains = useMemo(() => data.filter((item) => item.type === 'main'), [data]);
	const sauces = useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);

	return (
		<section className={styles.ingredients}>
			<IngredientsHeader
				title={'text text_type_main-large text text_color_primary mt-10 mb-5'}
				cards={styles.tabs + ' pb-10'}
			/>
			<div className={styles.wrapper}>
				<div className={styles.scroll + ' custom-scroll'}>
					<IngredientCategory 
						setShowIngredientPopup={setShowIngredientPopup}
						setCurrentIngredient={setCurrentIngredient}
					  category={buns} heading={'Булки'} listStyle={'pl-4 pr-4 ' + styles.list} textStyle={textStyle} 
						data={data}/>
					<IngredientCategory 
						setShowIngredientPopup={setShowIngredientPopup}
						setCurrentIngredient={setCurrentIngredient}
					  category={sauces} heading={'Соусы'} listStyle={'pl-4 pr-4 ' + styles.list} textStyle={textStyle + ' pt-10'} 
					  data={data}/>
					<IngredientCategory 
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

