

const IngredientList = ({ ingredient, deleteIngredient }) => {


  return (
    <>
      {ingredient.map((el) => {

        const {titre, quantite, unite, name} = el

        return (
          <div key={el.id} className="flex items-center space-x-4 my-3 bg-gray rounded-md py-1 px-2 w-fit">
            <p dir="rtl" className="">{quantite} {unite} {name}</p>
            {titre && <p dir="rtl" className="font-semibold">{titre} : </p>}
            <button onClick={()=>deleteIngredient(el.id)} className='bg-gray rounded-md py-1 px-2 text-red hover:font-bold duration-300'>&#10005;</button>
          </div>
        )
      })}
    </>
  )
}

export default IngredientList