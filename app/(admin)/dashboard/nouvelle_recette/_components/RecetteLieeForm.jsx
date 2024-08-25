'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
const LienRecetteList = dynamic(() => import("./LienRecetteList"), { ssr: false})


const RecetteLieeForm = ({ustensileList, lienRecetteList, setLienRecetteList}) => {

    const [name, setName] = useState()
    const nameRef = useRef()

    const [lienRecette, setLienRecette] = useState()
    const handleLink = (option) => {
        setLienRecette(option);
    };
  
    //create Link--------------------------------------------------------//
    const handleRecipeLink = (e) => {
      e.preventDefault();

      const newList = {
        id: Date.now(),
        name: name,
        link: lienRecette.value,
      };

      setLienRecetteList([...lienRecetteList, newList])
      setName('')
      nameRef.current.value = ''
      setLienRecette('')
    };

    //delete Link-----------------------------------------------------//
    const deleteLink = (id) => {
        const newList = lienRecetteList.filter(el =>el.id !== id)
        setLienRecetteList(newList)
    };

    return (
        <section>
            <p className="font-semibold mb-3">Recette liées :</p>
            <div className="md:flex items-center justify-between flex-wrap">
                <Select
                    options={ustensileList.map((el, i) => ({
                        value: el.title,
                        label: el.title,
                        id: i
                    }))}
                    onChange={handleLink}
                    value={lienRecette}
                    name="tags"
                    placeholder={<div className="text-[#9CA3BC]">Lien recette</div>}
                    className="w-72 md:w-96"
                    classNamePrefix="my-react-select"
                    isClearable={true}
                    components={{ IndicatorSeparator: () => null }}
                />

                 <input
                        type="text"
                        placeholder="Nom"
                        name="nom"
                        className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 my-8 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        onChange={(e) => setName(e.target.value)}
                        ref={nameRef}
                   />
            </div>

            <button onClick={handleRecipeLink} className="blue-btn text-sm">
                Créer lien
            </button>

            {lienRecetteList.length > 0 && <LienRecetteList lienRecetteList={lienRecetteList} deleteLink={deleteLink} />}
        </section>
    )
}

export default RecetteLieeForm