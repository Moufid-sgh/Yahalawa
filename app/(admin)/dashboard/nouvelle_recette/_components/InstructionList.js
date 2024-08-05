
const InstructionList = ({ instructionList }) => {
  return (
    <>
      {instructionList.map((el, i) => {

        const { nom, instruction, } = el

        return (
          <div key={i} className="flex flex-col my-6">
            <div className="flex justify-between">
              <p dir="rtl" className="underline font-semibold w-fit">{nom}</p>
              <button className='bg-gray rounded-md py-1 px-2 text-red hover:font-bold duration-300'>&#10005;</button>
            </div>
            <p dir="rtl" className="bg-gray rounded-md py-1 px-2 w-fit">{instruction}</p>
          </div>
        )
      })}
    </>
  )
}

export default InstructionList