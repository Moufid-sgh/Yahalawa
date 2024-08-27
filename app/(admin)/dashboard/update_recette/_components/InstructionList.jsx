'use client'

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const InstructionList = ({ id, titre, instruction, deleteInstruction }) => {
  console.log(instruction)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}
        className="flex items-center space-x-4 my-3 bg-gray rounded-md py-1 px-2 w-fit">
        <p dir="rtl" >{instruction}</p>
        <p dir="rtl" className="font-semibold">{titre} :</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            deleteInstruction(id);
          }}
          className='bg-gray rounded-md py-1 px-2 text-red hover:font-bold duration-300'>
          &#10005;
        </button>
      </div>
    </>
  )
}

export default InstructionList