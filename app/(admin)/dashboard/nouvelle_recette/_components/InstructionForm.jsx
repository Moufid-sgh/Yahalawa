'use client'

import { useState, useRef } from "react"
import dynamic from "next/dynamic"
const InstructionList = dynamic(() => import("./InstructionList"), {ssr: false})

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
        const newList = instructionList.filter(el =>el.id !== id)
        setInstructionList(newList)
    }


    return (
        <section>
            <p className="font-semibold mb-3">Instructions : <span className='text-red'>*</span></p>
            <div className="flex flex-col justify-between ">

                    
                    <input
                        type="text"
                        placeholder="Titre"
                        name="titre"
                        className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        onChange={(e) =>setTitre(e.target.value)}
                        ref={titreRef}
                    />

                <textarea
                    rows="4"
                    className="p-2.5 my-3 w-full md:w-[30rem] resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    placeholder="Instruction"
                    onChange={(e) => setInstruction(e.target.value)}
                    ref={instructionRef}>
                </textarea>

            </div>

            <button onClick={handleInstructions} className="blue-btn text-sm my-3">
                Créer instruction
            </button>

            {instructionList.length > 0 && <InstructionList instructionList={instructionList} deleteInstruction={deleteInstruction} />}
        </section>
    )
}

export default InstructionForm