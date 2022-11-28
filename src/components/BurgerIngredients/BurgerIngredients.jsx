import styles from './BurgerIngredients.module.css';
import IngredientsHeader from '../IngredientsHeader/IngredientsHeader';
import IngredientCard from '../IngredientCard/IngredientCard';

import PropTypes from 'prop-types';

function BurgerIngredients({ data }) {
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
					<h3 className={textStyle}>Булки</h3>
					<ul className={'pl-4 pr-4 ' + styles.list}>
						{buns.map((element) => {
							return (
								<IngredientCard
									image={element.image}
									alt={element.name}
									price={element.price}
									key={element._id}
								/>
							)
						}
						)}
					</ul>
					<h3 className={textStyle + ' pt-10'}>Соусы</h3>
					<ul className={'pl-4 pr-4 ' + styles.list}>
						{sauces.map((element) => {
							return (
								<IngredientCard
									image={element.image}
									alt={element.name}
									price={element.price}
									key={element._id}
								/>
							)
						}
						)}
					</ul>
					<h3 className={textStyle + ' pt-10' }>Начинка</h3>
					<ul className={'pl-4 pr-4 pb-8 ' + styles.list}>
						{mains.map((element) => {
							return (
								<IngredientCard
									image={element.image}
									alt={element.name}
									price={element.price}
									key={element._id}
								/>
							)
						}
						)}
					</ul>
				</div>
			</div>
		</section>
	)
}

BurgerIngredients.propTypes = { data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired };

export default BurgerIngredients;

