import { FC } from "react";
import { useSelector } from "../../../services/hooks";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

export const BottomBun: FC = () => {

  const { bunElement } = useSelector((store) => store.ingredientsReducer);

  return (
    <div className={' ml-4 mr-4 pl-8'}>
      {bunElement ? <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bunElement.name + ' (низ)'}
        thumbnail={bunElement.image}
        price={bunElement.price}
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