import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";


function IngredientsHeader({ title, cards }) {
  const [current, setCurrent] = React.useState("one");

  return (
    <>
      <h2 className={title}>Соберите бургер</h2>
      <div className={cards}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </>
  )
}

IngredientsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.string.isRequired
}

export default IngredientsHeader;