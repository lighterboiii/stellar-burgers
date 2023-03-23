import { FC } from "react";
import { useSelector } from "../../../services/hooks";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientsState } from "../../../services/reducers/ingredientsReducer";

export const BottomBun: FC = () => {

  const bun = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.bunElement);

  return (
    <div className={' ml-4 mr-4 pl-8'}>
      {bun ? <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bun.name + ' (низ)'}
        thumbnail={bun.image}
        price={bun.price}
      /> : <ConstructorElement
        type="bottom"
        isLocked={true}
        text={'Выберите булочку (низ)'}
        price={0}
        thumbnail={`https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg`}
      />
      }
    </div>
  )
}