import { FC } from "react";
import { useSelector } from "../../../services/hooks";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientsState } from "../../../services/reducers/ingredientsReducer";

export const TopBun: FC = () => {
  const { bunElement } = useSelector((store) => store.ingredientsReducer);

  return (
    <div className={'mb-4 ml-4 mr-4 pl-8'}>
      {bunElement ? <ConstructorElement
        type="top"
        isLocked={true}
        text={bunElement.name + ' (верх)'}
        thumbnail={bunElement.image}
        price={bunElement.price}
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