'use client'

import { useState, useRef, useId } from "react"
import dynamic from "next/dynamic"
const InstructionList = dynamic(() => import("./InstructionList"), { ssr: false })
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, } from '@dnd-kit/sortable';

const InstructionForm = ({ instructionList, setInstructionList }) => {

    const [titre, setTitre] = useState('')
    const titreRef = useRef()
    const [instruction, setInstruction] = useState('')
    const instructionRef = useRef()

    const handleInstructions = (e) => {
        e.preventDefault();
        const newList = {
            id: Date.now(),
            titre: titre,
            instruction: instruction,
        };
        setInstructionList([...instructionList, newList])
        setTitre('')
        titreRef.current.value = ''
        setInstruction('')
        instructionRef.current.value = ''
    }

    const deleteInstruction = (id) => {
        const newList = instructionList.filter(el => el.id !== id)
        setInstructionList(newList)
    }


    //handle drag and drop
    const ids = useId()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
              distance: 10,
            },
          }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );


    const handleDragEnd = (event) => {
        
        const { active, over } = event;

        if (active.id !== over.id) {
            setInstructionList((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newOrder = arrayMove(items, oldIndex, newIndex);

                //server action
                // editItems(newOrder);

                return newOrder;
            });
        }
    };


    return (
        <section>
            <p className="font-semibold mb-3">Instructions : <span className='text-red text-lg'>*</span></p>
            <div className="flex flex-col justify-between ">

            <div>
            <p className="text-sm mb-1 text-[#94a3b8]">Titre :</p>
                <input
                    type="text"
                    name="titre"
                    className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    onChange={(e) => setTitre(e.target.value)}
                    ref={titreRef}
                />
                </div>

                <div className="mt-6">
                <p className="text-sm mb-1 text-[#94a3b8]">Instruction :</p>
                <textarea
                    rows="4"
                    className="p-2.5 mt-3 w-full md:w-[30rem] resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    onChange={(e) => setInstruction(e.target.value)}
                    ref={instructionRef}>
                </textarea>
                </div>


            </div>

            <button onClick={handleInstructions} className="blue-btn text-sm my-3">
                Créer instruction
            </button>


            <DndContext
                id={ids}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={instructionList.map((el) => el.id)}
                    strategy={verticalListSortingStrategy}
                >

                    {instructionList.length > 0 &&
                       instructionList.map(({ id, title, description }) => (
                        <InstructionList key={id} id={id} titre={title} instruction={description} deleteInstruction={deleteInstruction} />
                    ))}

                </SortableContext>
            </DndContext>
        </section>
    )
}

export default InstructionForm