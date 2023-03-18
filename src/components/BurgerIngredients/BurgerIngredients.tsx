import styles from './BurgerIngredients.module.css';
import IngredientCategory from './IngredientCategory/IngredientCategory';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import { FC, useMemo, useRef, useState } from 'react';
import { useSelector } from '../../services/hooks';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';
import { Modal } from '../Modal/Modal';
import { IIngredient } from '../../services/actions/ingredients';

interface IBI {
	closePopup: () => void;
}

const BurgerIngredients: FC<IBI>= ({ closePopup }) => {
	const isIngredientModalOpen = useSelector(state => state.modalState.isIngredientModalOpen);
	const { ingredients } = useSelector((state) => state.ingredients);

	const buns = useMemo(() => ingredients.filter((item: IIngredient) => item.type === 'bun'), [ingredients]);
	const mains = useMemo(() => ingredients.filter((item: IIngredient) => item.type === 'main'), [ingredients]);
	const sauces = useMemo(() => ingredients.filter((item: IIngredient) => item.type === 'sauce'), [ingredients]);

	const bunRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	const [current, setCurrent] = useState<string>('buns');
	const { currentIngredient, selectedIngredients } = useSelector(state => state.ingredients);

	const handleClick = (value: string) => {
		switch (value) {
			case 'buns': {
				bunRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
				break;
			}
			case 'sauces': {
				sauceRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
				break;
			}
			case 'mains': {
				mainRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
				break;
			}
		}
	};
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleScroll = () => {
		const lineY = scrollRef.current?.getBoundingClientRect().y;
		const bunsOffset = Math.abs(bunRef.current!.getBoundingClientRect().y - (lineY as number));
		const sauceOffset = Math.abs(sauceRef.current!.getBoundingClientRect().y - (lineY as number));
		const mainsOffset = Math.abs(mainRef.current!.getBoundingClientRect().y - (lineY as number));

		if (bunsOffset < sauceOffset && bunsOffset < mainsOffset) setCurrent("buns");
		if (sauceOffset < bunsOffset && sauceOffset < mainsOffset) setCurrent("sauces");
		if (mainsOffset < bunsOffset && mainsOffset < sauceOffset) setCurrent("mains");
	}

	const textStyle = 'text text_type_main-medium text_color_primary pb-6';
	const listStyle = `pl-4 pr-4  ${styles.list} ${selectedIngredients.length === 0 && styles.disabled}`;

	return (
		<section className={styles.ingredients}>
			<h2 className={'text text_type_main-large text text_color_primary mt-10 mb-5'}>Соберите бургер</h2>
			<div className={styles.tabs}>
				<Tab value='buns' active={current === 'buns'} onClick={handleClick}>
					Булки
				</Tab>
				<Tab value='sauces' active={current === 'sauces'} onClick={handleClick}>
					Соусы
				</Tab>
				<Tab value='mains' active={current === 'mains'} onClick={handleClick}>
					Начинки
				</Tab>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.scroll + ' custom-scroll mt-10'} ref={scrollRef} onScroll={handleScroll}>
					<IngredientCategory ref={bunRef} category={buns} heading={'Булки'}
						listStyle={'pl-4 pr-4 ' + styles.list} textStyle={textStyle}
					/>
					<IngredientCategory ref={sauceRef} category={sauces} heading={'Соусы'}
						listStyle={listStyle}
						textStyle={textStyle + ' pt-10'}
					/>
					<IngredientCategory ref={mainRef} category={mains} heading={'Начинки'}
						listStyle={listStyle}
						textStyle={textStyle + ' pt-10'}
					/>
				</div>
			</div>
			{isIngredientModalOpen && (
				<Modal title={'Детали ингредиента'} closePopup={closePopup}>
					<IngredientDetails currentIngredient={currentIngredient}/>
				</Modal>
			)}
		</section>
	)
};

export default BurgerIngredients;

