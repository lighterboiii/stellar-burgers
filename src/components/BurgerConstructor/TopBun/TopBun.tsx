import { FC, useMemo } from "react";
import { useSelector } from "../../../services/hooks";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../../services/actions/ingredients";
import { TIngredientsState } from "../../../services/reducers/ingredientsReducer";

export const TopBun: FC = () => {
  const selectedIngredients = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.selectedIngredients);
  const bun = useMemo(() => selectedIngredients.find((ingredient: IIngredient) => ingredient.type === 'bun'), [selectedIngredients]);

  return (
    <div className={'mb-4 ml-4 mr-4 pl-8'}>
      {bun &&
        selectedIngredients.length > 0 ? <ConstructorElement
        type="top"
        isLocked={true}
        text={bun.name + ' (верх)'}
        thumbnail={bun.image}
        price={bun.price}
      /> : <ConstructorElement
        type="top"
        isLocked={true}
        text={'Выберите булочку (верх)'}
        price={0}
        thumbnail={`https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg`}
      />
      }
    </div>
  )
}