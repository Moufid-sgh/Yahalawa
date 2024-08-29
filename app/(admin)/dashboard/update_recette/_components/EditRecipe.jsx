'use client'

import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
import { useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { difficulté } from '../../_components/Data'
import UploadFile from '../../_components/UploadFile'
import Ingredientform from './Ingredientform'
import RecetteLieeForm from './RecetteLieeForm'
import InstructionForm from './InstructionForm'
import FaitNutri from './FaitNutri'
import { addRecipe, deleteCategorySelected, deleteOrigineSelected } from '@/app/actions/recipe-action'


const EditRecipe = ({ recette, origineList, categoryList, ustensileList, unitList, allIngredients, tagsList }) => {


    const { pending } = useFormStatus()

    //handle type
    const [type, setType] = useState(null)
    const handleType = (option) => {
        setType(option);
    };

    //handle status
    const [status, setstatus] = useState(null)
    const handlestatus = (option) => {
        setstatus(option);
    };

    //handle categorie
    const [categorie, setCategorie] = useState([])
    const handleCategorie = (option) => {
        setCategorie(option);
    };

    //handle difficulty
    const [difficulty, setDifficulty] = useState([])
    const handleDifficulty = (option) => {
        setDifficulty(option);
    };

    //handle origine
    const [origine, setOrigine] = useState([])
    const handleOrigine = (option) => {
        setOrigine(option);
    };

    //handle tags
    const [tag, setTag] = useState([])
    const handleTags = (option) => {
        setTag(option);
    };

    //handle tags
    const [ustensile, setUstensile] = useState([])
    const handleUstensile = (option) => {
        setUstensile(option);
    };



    //send data
    const [error, setError] = useState('')
    const [ingredientList, setIngredient] = useState([])
    const [lienRecetteList, setLienRecetteList] = useState([])
    const [instructionList, setInstructionList] = useState([])

    const formRef = useRef(null)

    const handleAction = async (formData) => {

        formData.append('ingredientList', JSON.stringify(ingredientList));
        formData.append('lienRecetteList', JSON.stringify(lienRecetteList));
        formData.append('instructionList', JSON.stringify(instructionList));

        const result = await addRecipe(formData);

        if (formRef.current) {
            formRef.current.reset();
        }

        if (result?.error) {
            setError(result.error)
        }
    };




    return (

        <form action={handleAction} ref={formRef} className="flex flex-col w-full bg-white rounded-md p-8">

            <section className="flex items-start space-x-40">
                <div className="flex flex-col space-y-6 w-72 md:w-96">
                    <div className='relative'>
                        <p className="text-sm mb-1 text-[#94a3b8]">IdI : <span className='text-red text-lg'>*</span></p>
                        <input
                            type="text"
                            name="IdI"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            defaultValue={recette.id_intern}
                        />
                    </div>

                    <div className='relative'>
                        <p className="text-sm mb-1 text-[#94a3b8]">Titre : <span className='text-red text-lg'>*</span></p>
                        <input
                            type="text"
                            name="title"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            defaultValue={recette.title}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Description : <span className='text-red text-lg'>*</span></p>
                        <textarea
                            rows="4"
                            className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            name='description'
                            defaultValue={recette.description}
                        >
                        </textarea>
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Type : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={[{ value: 'Free', label: 'Free' },
                            { value: 'T-Telecom', label: 'T-Telecom' }
                            ]}
                            onChange={handleType}
                            value={type}
                            defaultInputValue={recette.is_paying}
                            name="type"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Statut : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={[
                                { value: 'publiée', label: 'publiée' },
                                { value: 'non publiée', label: 'non publiée' },
                                { value: 'brouillon', label: 'brouillon' }
                            ]}
                            onChange={handlestatus}
                            value={status}
                            defaultInputValue={recette.status}
                            name="status"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Categorie : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={categoryList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleCategorie}
                            value={categorie}
                            name="category"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    {/* categpry list************************/}
                    <div className="flex items-center flex-wrap">
                        {recette.category.map((cat => {
                            return (
                                <div key={cat.id} className="m-1.5 p-1 bg-gray flex items-center bg-gray rounded-md">
                                    <p>{cat.title}</p>
                                    <p onClick={() => deleteCategorySelected(cat.id)} className='ml-2 cursor-pointer text-red hover:font-bold duration-300'>&#10005;</p>
                                </div>
                            )
                        }))}
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Difficulté : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={difficulté}
                            onChange={handleDifficulty}
                            value={difficulty}
                            defaultInputValue={recette.difficulty}
                            name="difficulty"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Temps de cuisson : <span className='text-red text-lg'>*</span></p>
                            <input
                                type="number"
                                name="cooking_time"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                defaultValue={recette.cooking_time}
                            />
                        </div>

                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Portion <span className='text-red text-lg'>*</span></p>
                            <input
                                type="number"
                                name="nbr_serves"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                defaultValue={recette.nbr_serves}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='relative'>
                            <p className="text-sm mb-1 text-[#94a3b8]">Temperature :</p>
                            <input
                                type="number"
                                name="cooking_temperature"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                defaultValue={recette.cooking_temperature}
                            />
                        </div>

                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Temps de preparation :</p>
                            <input
                                type="number"
                                name="preparation_time"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                defaultValue={recette.preparation_time}
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Origine :</p>
                        <Select
                            options={origineList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleOrigine}
                            value={origine}
                            name="origine"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    {/* origine list************************/}
                    {recette.origine.length > 0 && <div className="flex items-center flex-wrap">
                        {recette.origine.map((el => {
                            return (
                                <div key={el.id} className="m-1.5 p-1 bg-gray flex items-center bg-gray rounded-md">
                                    <p>{el.title}</p>
                                    <p onClick={() => deleteOrigineSelected(el.id)} className='ml-2 cursor-pointer text-red hover:font-bold duration-300'>&#10005;</p>
                                </div>
                            )
                        }))}
                    </div>}

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Tags :</p>
                        <Select
                            options={tagsList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleTags}
                            value={tag}
                            name="tags"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    {/* tags list************************/}
                    {recette.tags.length > 0 && <div className="flex items-center flex-wrap">
                        {recette.tags.map((el => {
                            return (
                                <div key={el.id} className="m-1.5 p-1 bg-gray flex items-center bg-gray rounded-md">
                                    <p>{el.title}</p>
                                    <p onClick={() => deleteOrigineSelected(el.id)} className='ml-2 cursor-pointer text-red hover:font-bold duration-300'>&#10005;</p>
                                </div>
                            )
                        }))}
                    </div>}

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Ustensile :</p>
                        <Select
                            options={ustensileList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleUstensile}
                            value={ustensile}
                            name="tags"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    {/* ustensile list************************/}
                    {/* {recette.ustensiles.length > 0 && <div className="flex items-center flex-wrap">
                        {recette.ustensiles.map((el => {
                            return (
                                <div  key={el.id} className="m-1.5 p-1 bg-gray flex items-center bg-gray rounded-md">
                                    <p>{el.title}</p>
                                    <p onClick={()=>deleteOrigineSelected(el.id)} className='ml-2 cursor-pointer text-red hover:font-bold duration-300'>&#10005;</p>
                                </div>
                            )
                        }))}
                    </div>} */}

                    <Ingredientform unitList={unitList} allIngredients={allIngredients} ingredientList={recette.ingredients} setIngredient={setIngredient} />

                    <RecetteLieeForm ustensileList={ustensileList} lienRecetteList={recette.relatedRecipe} setLienRecetteList={setLienRecetteList} />

                </div>


                {/* second part---------------------------------------------------------------------------- */}
                <div className="flex flex-col space-y-8 w-72 md:w-96">

                    <div>
                        <p className="font-semibold">Upload media:</p>
                        <div className="md:flex items-center justify-between flex-wrap mb-6 mt-2">
                            <UploadFile type="image" name="img" accept="image/jpeg, image/png, image/webp" />
                            <UploadFile type="video" name="video" accept="video/mp4, video/webm, video/ogg, video/avi, video/mpeg" />
                        </div>
                    </div>

                    <InstructionForm instructionList={recette.steps} setInstructionList={setInstructionList} />

                    <div className='fixed right-6 shadow-lg rounded-md p-2'>
                        <textarea
                            rows="4"
                            className="p-2.5 w-40 h-48 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            placeholder="Note"
                            name='note'
                            defaultValue={recette.note}
                        >
                        </textarea>
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Likes :</p>
                        <input
                            type="number"
                            name="likes"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Link youytube :</p>
                        <input
                            type="text"
                            name="video_link"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        />
                    </div>

                    <FaitNutri />

                    {/*Référencement Google----------------------------------------------------------- */}
                    <div>
                        <p className="font-semibold mb-2 mt-6">Référencement Google :</p>

                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Titre :</p>
                            <input
                                name="seoTitle"
                                className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            />
                        </div>

                        <div className='mt-6'>
                            <p className="text-sm mb-1 text-[#94a3b8]">Description :</p>
                            <textarea
                                rows="4"
                                className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                name='seoDescription'>
                            </textarea>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex flex-col items-center justify-center mt-12">
                <button className="green-btn text-sm" type="submit" disabled={pending} >
                    {pending
                        ?
                        <div className="flex items-center space-x-1">
                            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                            <span>Sauvgarder</span>
                        </div>
                        :
                        'Sauvgarder'
                    }
                </button>

                {error && <p className="text-sm text-red mt-2">{error}</p>}
            </div>
        </form>
    )
}

export default EditRecipe







