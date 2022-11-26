import styles from './BurgerIngredients.module.css';
import IngredientsHeader from '../IngredientsHeader/IngredientsHeader';
import IngredientCard from '../IngredientCard/IngredientCard';

import data from '../utils/data';


function BurgerIngredients() {
	const textStyle = 'text text_type_main-medium text_color_primary pb-6';

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
						{data.map((element) => {
							if (element.type === "bun") {
								return (
									<IngredientCard
										image={element.image}
										alt={element.name}
										price={element.price}
										key={element._id}
									/>
								)
							}
						})}
					</ul>
					<h3 className={textStyle + ' pt-10'}>Соусы</h3>
					<ul className={'pl-4 pr-4 ' + styles.list}>
						{data.map((element) => {
							if (element.type === "sauce") {
								return (
									<IngredientCard
										image={element.image}
										alt={element.name}
										price={element.price}
										key={element._id}
									/>
								)
							}
						})}
					</ul>
					<h3 className={textStyle + ' pt-10'}>Начинка</h3>
					<ul className={'pl-4 pr-4 pb-8 ' + styles.list}>
						{data.map((element) => {
							if (element.type === "main") {
								return (
									<IngredientCard
										image={element.image}
										alt={element.name}
										price={element.price}
										key={element._id}
									/>
								)
							}
						})}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default BurgerIngredients;

