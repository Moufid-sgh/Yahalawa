'use client'

import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
import { useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { addTips } from "@/app/actions/tips-action"
import { DatePicker } from '../../nouvelle_recette/_components/DatePicker'
import { hour } from '../../_components/Data'
import UploadFile from '../../_components/UploadFile'

const FormData = ({categoryList}) => {

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
    

    //send data
    const [error, setError] = useState('')

    const formRef = useRef(null)

    const handleAction = async (formData) => {
        const result = await addTips(formData)

        if (formRef.current) {
            formRef.current.reset();
          }

        if (result?.error) {
            setError(result.error)
        }

    }

    //planning post
    const [date, setDate] = useState('')
    const [heure, setHeure] = useState([])
    const hours = hour()

    const handleHour = (option) => {
        setHeure(option);
    };


    return (

            <form action={handleAction} ref={formRef} className="flex flex-col w-full bg-white rounded-md p-8">

                <section className="flex items-start space-x-24">
                    <div className="flex flex-col space-y-6">
                        <div className='relative'>
                            <p className='text-red absolute bottom-9 left-1'>*</p>
                            <input
                                placeholder="IdI"
                                name="IdI"
                                className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            />
                        </div>

                        <div className='relative'>
                            <p className='text-red absolute bottom-9 left-1'>*</p>
                            <input
                                placeholder="Titre"
                                name="title"
                                className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            />
                        </div>

                        <div className='relative'>
                            <p className='text-red absolute bottom-[117px] left-1'>*</p>
                            <textarea
                                rows="4"
                                className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                placeholder="Description"
                                name='description'>
                            </textarea>
                        </div>

                        <div className='relative'>
                            <p className='text-red absolute bottom-8 left-1'>*</p>
                            <Select
                                options={[{ value: 'Free', label: 'Free' },
                                { value: 'T-Telecom', label: 'T-Telecom' }
                                ]}
                                onChange={handleType}
                                value={type}
                                name="type"
                                placeholder={<div className="text-[#9CA3BC]">Type</div>}
                                className="w-72 md:w-96"
                                classNamePrefix="my-react-select"
                                isClearable={true}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                            />
                        </div>

                        <div className='relative'>
                            <p className='text-red absolute bottom-8 left-1'>*</p>
                            <Select
                                options={[
                                { value: 'publiée', label: 'publiée' },
                                { value: 'non publiée', label: 'non publiée' },
                                { value: 'brouillon', label: 'brouillon' }
                                ]}
                                onChange={handlestatus}
                                value={status}
                                name="status"
                                placeholder={<div className="text-[#9CA3BC]">Statut</div>}
                                className="w-72 md:w-96"
                                classNamePrefix="my-react-select"
                                isClearable={true}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                            />
                        </div>

                        <div className='relative'>
                            <p className='text-red absolute bottom-8 left-1'>*</p>
                            <Select
                                options={categoryList.map((el,i) => ({
                                    value: el.title,
                                    label: el.title,
                                    id: i
                                  }))}
                                onChange={handleCategorie}
                                value={categorie}
                                name="category"
                                placeholder={<div className="text-[#9CA3BC]">Categorie</div>}
                                className="w-72 md:w-96"
                                classNamePrefix="my-react-select"
                                isClearable={true}
                                isMulti
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                            />
                        </div>

                        <textarea
                            rows="4"
                            className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            placeholder="Note"
                            name='note'>
                        </textarea>

                        <input
                            type="number"
                            placeholder="Likes"
                            name="likes"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        />
                    </div>


                    <div className="flex flex-col">
                        <p className="font-semibold">Upload media:</p>
                        <div className="md:flex items-center justify-between flex-wrap mb-6 mt-2">
                            <UploadFile type="image" name="img" accept="image/jpeg, image/png, image/webp" />
                            <UploadFile type="video" name="video" accept="video/mp4, video/webm, video/ogg, video/avi, video/mpeg" />
                        </div>

                        {/* handle Date------------------------------------------------------------- */}
                        <p className="font-semibold mb-2">Date de publication prévue:</p>
                        <DatePicker date={date} setDate={setDate} name="date" />

                        <Select
                            options={hours}
                            onChange={handleHour}
                            value={heure}
                            name="hour"
                            placeholder={<div className="text-[#9CA3BC]">Heure</div>}
                            className="w-72 md:w-96 my-6"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isDisabled={date ? false : true}
                            components={{
                                IndicatorSeparator: () => null
                            }}
                        />

                        {/*Référencement Google----------------------------------------------------------- */}
                        <p className="font-semibold mb-2">Référencement Google :</p>

                        <input
                            placeholder="Titre"
                            name="seoTitle"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 mb-6 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        />

                        <textarea
                            rows="4"
                            className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            placeholder="Description"
                            name='seoDescription'>
                        </textarea>
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

export default FormData







