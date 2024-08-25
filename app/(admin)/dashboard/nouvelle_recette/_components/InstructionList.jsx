'use lcient'

const InstructionList = ({ instructionList, deleteInstruction }) => {

  return (
    <>
      {instructionList.map((el) => {

        const { titre, instruction, } = el

        return (
          <div key={el.id} className="flex items-center space-x-4 my-3 bg-gray rounded-md py-1 px-2 w-fit">
             <p dir="rtl" >{instruction}</p>
             {titre && <p dir="rtl" className="font-semibold">{titre} : </p>}
            <button onClick={()=>deleteInstruction(el.id)} className='bg-gray rounded-md py-1 px-2 text-red hover:font-bold duration-300'>&#10005;</button>
          </div>
        )
      })}
    </>
  )
}

export default InstructionList