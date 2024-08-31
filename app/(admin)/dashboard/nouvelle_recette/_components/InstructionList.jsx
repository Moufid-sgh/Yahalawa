'use client'

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil } from 'lucide-react';
import DeleteItem from './DeleteItem';

const InstructionList = ({ id, titre, instruction, deleteInstruction, handleEdit }) => {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}
        className="flex items-center space-x-4 my-3 bg-gray rounded-md py-1 px-2 w-fit">
        <p dir="rtl" >{instruction}</p>
        <p dir="rtl" className="font-semibold border-r border-black pr-2">{titre} :</p>

        <div className="flex items-center space-x-3">
              <Pencil className="size-5 hover:text-blue duration-300 cursor-pointer" onClick={handleEdit} />
              <DeleteItem deleteItem={() => deleteInstruction(id)} />
            </div>

      </div>
  )
}

export default InstructionList