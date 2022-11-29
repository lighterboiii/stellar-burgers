import styles from './BurgerIngredients.module.css';
import IngredientsHeader from './IngredientsHeader/IngredientsHeader';
import IngredientCategory from './IngredientCategory/IngredientCategory';

import PropTypes from 'prop-types';


function BurgerIngredients({data}) {
	const textStyle = 'text text_type_main-medium text_color_primary pb-6'; 

	const buns = data.filter((item) => item.type === 'bun');
	const mains = data.filter((item) => item.type === 'main');
	const sauces = data.filter((item) => item.type === 'sauce');

	return (
		<section className={styles.ingredients}>
			<IngredientsHeader
				title={'text text_type_main-large text text_color_primary mt-10 mb-5'}
				cards={styles.tabs + ' pb-10'}
			/>
			<div className={styles.wrapper}>
				<div className={styles.scroll + ' custom-scroll'}>
					<IngredientCategory category={buns} heading={'Булки'} listStyle={'pl-4 pr-4 ' + styles.list} textStyle={textStyle} />
					<IngredientCategory category={sauces} heading={'Соусы'} listStyle={'pl-4 pr-4 ' + styles.list} textStyle={textStyle + ' pt-10'} />
					<IngredientCategory category={mains} heading={'Начинки'} listStyle={'pl-4 pr-4 pb-8 ' + styles.list} textStyle={textStyle + ' pt-10'} />
				</div>
			</div>
		</section>
	)
}

BurgerIngredients.propTypes = { data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired };

export default BurgerIngredients;

