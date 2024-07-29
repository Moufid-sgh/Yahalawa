
const LienRecetteList = ({ lienRecetteList }) => {
    return (
      <>
        {lienRecetteList.map((el, i) => {
  
          const {lien, nom} = el
  
          return (
            <div key={i} className="flex items-center space-x-4 my-3">
              <p dir="rtl" className="bg-gray rounded-md py-1 px-2 w-fit">{lien} {nom}</p>
              <button className='bg-gray rounded-md py-1 px-2 text-red hover:font-bold duration-300'>&#10005;</button>
            </div>
          )
        })}
      </>
    )
  }
  
  export default LienRecetteList