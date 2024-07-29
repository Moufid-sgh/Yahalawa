'use client'

import { useState, useRef } from 'react'
import InputField from '../_components/inputs/InputField'
import InputSelect from '../_components/inputs/InputSelect'
import SwitchBtn from '../_components/SwitchBtn'
import { BrouillonData } from '../_components/Data'
import UploadFile from '../_components/UploadFile'


const page = () => {

    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')
    const [enAvantCategorie, setEnAvantCategorie] = useState(false)
    const [status, setStatus] = useState([])

    //Referencement
    const [titreReferencement, setTitreReferencement] = useState('')
    const [textReferencement, setTextReferencement] = useState('')
    const titreReferencementRef = useRef()
    const textReferencementRef = useRef()


    return (
        <main className="mt-6 ml-12 md:ml-20" >

            <h1 className="text-2xl font-semibold tracking-wide">Ajouter une categorie</h1>

            <form className="flex flex-col space-y-3 bg-white rounded-md p-4 lg:w-[75%] space-y-6 mt-4">

                <InputField type="text" setValue={setTitre} placeholder="Titre" />

                <textarea
                    rows="4"
                    className="p-2.5 my-3 w-full md:w-[30rem] resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}>
                </textarea>

                <InputSelect
                    value={status}
                    setValue={setStatus}
                    options={BrouillonData}
                    onChange={(status) => setStatus(status)}
                    placeholder="Status"
                />

                <section className="md:flex items-center justify-around flex-wrap">
                    <SwitchBtn setValue={setEnAvantCategorie} value={enAvantCategorie} id="enAvantCategorie" label="Mis en avant" />
                    <UploadFile type="image" accept="image/jpeg, image/png, image.webp" />
                </section>

                <p className="font-semibold mt-5">Référencement Google :</p>

                <div className="flex flex-col">
                    <InputField type="text" setValue={setTitreReferencement} ref={titreReferencementRef} placeholder="Titre" />

                    <textarea
                        rows="4"
                        className="p-2.5 my-3 w-full md:w-[30rem] resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray "
                        placeholder="Text principale"
                        onChange={(e) => setTextReferencement(e.target.value)}
                        ref={textReferencementRef}>
                    </textarea>
                </div>

                <div className="w-full mt-4 text-center">
                    <button className="green-btn">Sauvgarder</button>
                </div>
            </form>

        </main>
    )
}

export default page