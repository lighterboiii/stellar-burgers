import IngredientCard from "../Ingredient/Ingredient";

function IngredientCategory({ category, heading, listStyle, textStyle }) {
  return (
    <>
      <h3 className={textStyle}>{heading}</h3>
      <ul className={listStyle}>
      {category.map((element) => {
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
    </>
  )
}

export default IngredientCategory;