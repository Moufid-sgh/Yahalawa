'use client'

import { useRef, useState } from "react"
import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
const IngredientList  = dynamic(()=> import("./IngredientList"), {ssr: false})


const Ingredientform = ({unitList ,allIngredients, ingredientList, setIngredient }) => {
    console.log(ingredientList)


    const [ingredientTitle, setIngredientTitle] = useState()
    const ingredientTitleRef = useRef()

    const [ingredientName, setIngredientName] = useState()
    const handleIngredientName = (option) => {
        setIngredientName(option);
    };

    const [unite, setUnite] = useState()
    const handleUnite = (option) => {
        setUnite(option);
    };

    const [qte, setQte] = useState()
    const qteRef = useRef()


    //create ingredient--------------------------------------//
    // const [ingredientList, setIngredient] = useState([])

    const handleIngredient = (e) => {
        e.preventDefault();

        const newIngredient = {
            id: Date.now(),
            titre: ingredientTitle,
            quantite: qte,
            unite: unite.value,
            name: ingredientName.value
        };

        setIngredient([...ingredientList, newIngredient])
        setIngredientTitle('')
        ingredientTitleRef.current.value = ''
        setIngredientName('')
        setQte('')
        qteRef.current.value = ''
        setUnite('')
    };

        //delete ingredient--------------------------------------//
        const deleteIngredient = (id) => {
            const newList = ingredientList.filter(el =>el.id !== id)
            setIngredient(newList)
        }


    return (
        <section className="w-72 md:w-96">
            <p className="font-semibold mb-3">Ingrédients : <span className='text-red'>*</span></p>
            <input
                type="text"
                placeholder="Titre"
                name="ingredientTitle"
                className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                onChange={(e) => setIngredientTitle(e.target.value)}
                ref={ingredientTitleRef}
            />

            <div className="md:flex items-center justify-between flex-wrap">

                <input
                    type="number"
                    placeholder="Quantité"
                    name="quantite"
                    className="w-[180px] rounded-md border border-gray py-2 px-4 my-8 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    onChange={(e) => setQte(e.target.value)}
                    ref={qteRef}
                />

                <Select
                    options={unitList.map((el, i) => ({
                        value: el.title,
                        label: el.title,
                        id: i
                    }))}
                    onChange={handleUnite}
                    value={unite}
                    name="unite"
                    placeholder={<div className="text-[#9CA3BC]">Unité</div>}
                    className="w-[180px] my-8"
                    classNamePrefix="my-react-select"
                    isClearable={true}
                    components={{ IndicatorSeparator: () => null }}
                />

                <Select
                    options={allIngredients.map((el, i) => ({
                        value: el.title,
                        label: el.title,
                        id: i
                    }))}
                    onChange={handleIngredientName}
                    value={ingredientName}
                    name="ingredient"
                    placeholder={<div className="text-[#9CA3BC]">Ingredient</div>}
                    className="w-72 md:w-96 mb-3"
                    classNamePrefix="my-react-select"
                    isClearable={true}
                    components={{ IndicatorSeparator: () => null }}
                />

            </div>

            <button onClick={handleIngredient} className="blue-btn text-sm my-3">
                Créer ingrédient
            </button>

            {ingredientList.length > 0 && <IngredientList ingredient={ingredientList} deleteIngredient={deleteIngredient}/>}
        </section>
    )
}

export default Ingredientform