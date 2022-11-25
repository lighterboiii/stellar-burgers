import styles from './BurgerIngredients.module.css';
import IngredientsHeader from '../IngredientsHeader/IngredientsHeader';
import Card from '../IngredientCard/IngredientCard';

import data from '../utils/data';


function BurgerIngredients() {
	return (
		<section className={styles.ingredients + ' pr-10'}>
			<IngredientsHeader
				title={'text text_type_main-large text text_color_primary pt-10 pb-5'}
				cards={styles.tabs}
			/>
			<div className={styles.wrapper + ' custom-scroll'}>
				<article className='pt-10'>
					<h3 className='text text_type_main-medium text_color_primary'>Булки</h3>
					<ul className={'pt-6 pl-4 pr-4 pb-10 ' + styles.list}>
						{data.map((element) => {
							if (element.type === "bun") {
								return (
									<Card
										image={element.image}
										alt={element.name}
										price={element.price}
										key={element._id}
									/>
								)
							}
						})}
					</ul>
				</article>
				<article className='pt-10'>
					<h3 className='text text_type_main-medium text_color_primary'>Соусы</h3>
					<ul className={'pt-6 pl-4 pr-4 pb-8 ' + styles.list}>
						{data.map((element) => {
							if (element.type === "sauce") {
								return (
									<Card
										image={element.image}
										alt={element.name}
										price={element.price}
										key={element._id}
									/>
								)
							}
						})}
					</ul>
				</article>
				<article className='pt-10'>
					<h3 className='text text_type_main-medium text_color_primary'>Начинка</h3>
					<ul className={'pt-6 pl-4 pr-4 pb-8 ' + styles.list}>
						{data.map((element) => {
							if (element.type === "main") {
								return (
									<Card
										image={element.image}
										alt={element.name}
										price={element.price}
										key={element._id}
									/>
								)
							}
						})}
					</ul>
				</article>
			</div>
		</section>
	)
}

export default BurgerIngredients;

