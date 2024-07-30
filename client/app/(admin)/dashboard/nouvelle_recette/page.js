'use client'

import useStore from "@/app/store"
import UploadFile from "../_components/UploadFile"
import { difficulté, BrouillonData, hour, unitéData, ingredientData } from "../_components/Data"
import { useState, useRef, useEffect } from "react"
import InputField from "../_components/inputs/InputField"
import InputSelect from "../_components/inputs/InputSelect"
import IngredientList from "./_components/IngredientList"
import LienRecetteList from "./_components/LienRecetteList"
import InstructionList from "./_components/InstructionList"
import SwitchBtn from "../_components/SwitchBtn"
import ScrollToTop from "../_components/ScrollToTop"
import { DatePicker } from "./_components/DatePicker"


const Page = () => {

  const navExpanded = useStore((state) => state.navExpanded)

  const [idi, setIdi] = useState()
  const [tittreRecette, setTittreRecette] = useState()
  const [text, setText] = useState()

  const [enAvant, setEnAvant] = useState(false)
  const [notes, setNotes] = useState(false)
  const [date, setDate] = useState('')
  const [heure, setHeure] = useState([])
  const hours = hour()
  const [status, setStatus] = useState([])
  const notesRef = useRef()

  useEffect(() => {
    if (!date) {
      setHeure([])
    }
  }, [date])

  const [difficulte, setDifficulte] = useState([])
  const [tempCuisson, setTempCuisson] = useState()
  const [nbPersonne, setNbPersonne] = useState()
  const [temperature, setTemperature] = useState()
  const [tempPreparation, setTempPreparation] = useState()

  const [userType, setUserType] = useState('')

  const [youtube, setYoutube] = useState('')
  const [booster, setBooster] = useState()

  const [origine, setOrigine] = useState([])
  const [categorie, setCategorie] = useState([])
  const [tag, setTag] = useState([])
  const [ustensiles, setUstensiles] = useState([])

  //ingredient
  const [titreIngredient, setTitreIngredient] = useState()
  const [qteValue, setQteValue] = useState()
  const qteValueRef = useRef()
  const [uniteValue, setUniteValue] = useState()
  const [typeValue, setTypeValue] = useState()
  const [ingredient, setIngredient] = useState([])

  const handleIngredient = (e) => {
    e.preventDefault();
    const newIngredient = {
      quantite: qteValue,
      unite: uniteValue.value,
      type: typeValue.value
    };
    setIngredient([...ingredient, newIngredient])
    setQteValue('')
    qteValueRef.current.value = ''
    setUniteValue('')
    setTypeValue('')
  }

  //lien recette
  const [lienRecetteList, setLienRecetteList] = useState([])
  const [lienRecette, setLienRecette] = useState([])
  const [nomLienRecette, setNomLienRecette] = useState('')
  const nomLienRecetteRef = useRef()

  const handleRecipeLink = (e) => {
    e.preventDefault();
    const newList = {
      nom: nomLienRecette,
      lien: lienRecette.value,
    };
    setLienRecetteList([...lienRecetteList, newList])
    setNomLienRecette('')
    nomLienRecetteRef.current.value = ''
    setLienRecette('')
  }

  //Instruction
  const [instructionTitre, setInstructionTitre] = useState('')
  const instructionTitreRef = useRef()
  const [instruction, setInstruction] = useState('')
  const instructionRef = useRef()
  const [instructionList, setInstructionList] = useState([])

  const handleInstructions = (e) => {
    e.preventDefault();
    const newList = {
      nom: instructionTitre,
      instruction: instruction,
    };
    setInstructionList([...instructionList, newList])
    setInstructionTitre('')
    instructionTitreRef.current.value = ''
    setInstruction('')
    instructionRef.current.value = ''
  }

  //nutritionnels
  const [nutriOn, setNutriOn] = useState(false)
  const [glucides, setGlucides] = useState('')
  const [proteines, setProteines] = useState('')
  const [graisses, setGraisses] = useState('')
  const [kcal, setKcal] = useState('')
  const glucideRef = useRef()
  const proteineRef = useRef()
  const graisseRef = useRef()
  const kcalRef = useRef()

  //Referencement
  const [titreReferencement, setTitreReferencement] = useState('')
  const [textReferencement, setTextReferencement] = useState('')
  const titreReferencementRef = useRef()
  const textReferencementRef = useRef()


  return (
    <main className={`${navExpanded ? 'ml-56' : 'ml-12 md:ml-20'} mt-6 transition-all duration-500`}>

      <h1 className="text-2xl font-semibold tracking-wide">Ajouter une recette</h1>

      <form className="bg-white rounded-md p-4 lg:w-[75%] space-y-6 mt-4">

        <section className="flex flex-col ">
          <InputField type="text" setValue={setIdi} placeholder="IDI" />

          <InputField type="text" setValue={setTittreRecette} placeholder="Titre" />

          <textarea
            rows="4"
            className="p-2.5 my-3 w-full md:w-[30rem] resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
            placeholder="Text principale"
            onChange={(e) => setText(e.target.value)}>
          </textarea>
        </section>

        <section>
          <SwitchBtn setValue={setEnAvant} value={enAvant} id="enAvant" label="Mis en avant" />

          <div className="md:flex items-center justify-between flex-wrap">
            <InputField type="text" setValue={setNotes} ref={notesRef} placeholder="Notes" />

            <InputSelect
              value={status}
              setValue={setStatus}
              options={BrouillonData}
              onChange={(status) => setStatus(status)}
              placeholder="Status"
            />

            <DatePicker date={date} setDate={setDate} />

            <InputSelect
              value={heure}
              setValue={setHeure}
              options={hours}
              onChange={(heure) => setHeure(heure)}
              placeholder="Heure"
              isDisabled={date ? false : true}
            />
          </div>
        </section>


        <section className="md:flex items-center justify-around flex-wrap">
          <UploadFile type="image" accept="image/jpeg, image/png, image.webp" />
          <UploadFile type="video" accept="video/mp4, video/webm, video/ogg, video/avi, video/mpeg" />
        </section>


        <section className="md:flex items-center justify-between flex-wrap">
          <InputSelect
            value={difficulte}
            setValue={setDifficulte}
            options={difficulté}
            onChange={(difficulte) => setDifficulte(difficulte)}
            placeholder="Difficulté"
          />

          <InputField type="number" setValue={setTempCuisson} placeholder="Temps de cuisson" />

          <InputField type="number" setValue={setNbPersonne} placeholder="Nombre de personnes" />

          <InputField type="number" setValue={setTemperature} placeholder="Température" />

          <InputField type="number" setValue={setTempPreparation} placeholder="Temps de préparation" />

          <InputSelect
            value={origine}
            setValue={setOrigine}
            // options={}
            onChange={(origine) => setOrigine(origine)}
            placeholder="Origine"
          />
        </section>


        <section>
          <p className="font-semibold mb-3">Type :</p>
          <div className="flex items-center mb-4">
            <input id="Premium" type="radio" value="Premium" name="type" className="w-4 h-4 text-blue bg-gray border-gray"
              onChange={(e) => setUserType(e.target.value)}
            />
            <label htmlFor="Premium" className="ms-2 italic text-sm font-medium cursor-pointer">Premium</label>
          </div>
          <div className="flex items-center">
            <input id="Free" type="radio" value="Free" name="type" className="w-4 h-4 text-blue bg-gray border-gray"
              onChange={(e) => setUserType(e.target.value)}
            />
            <label htmlFor="Free" className="ms-2 italic text-sm font-medium cursor-pointer">Free</label>
          </div>
        </section>


        <section className="md:flex items-center justify-between flex-wrap">
          <InputField type="text" setValue={setYoutube} placeholder="Lien youtube" />

          <InputField type="number" setValue={setBooster} placeholder="Booster les likes" />

          <InputSelect
            value={categorie}
            setValue={setCategorie}
            options={ingredientData}
            onChange={(categorie) => setCategorie(categorie)}
            isMulti={true}
            placeholder="Catégorie recette"
          />

          <InputSelect
            value={tag}
            setValue={setTag}
            options={ingredientData}
            onChange={(tag) => setTag(tag)}
            isMulti={true}
            placeholder="Tags"
          />

          <InputSelect
            value={ustensiles}
            setValue={setUstensiles}
            // options={}
            onChange={(ustensiles) => setUstensiles(ustensiles)}
            placeholder="Ustensiles"
          />
        </section>


        <section>
          <p className="font-semibold mb-3">Ingrédients :</p>
          <InputField type="text" setValue={setTitreIngredient} placeholder="Titre ingrédient" />

          <div className="md:flex items-center justify-between flex-wrap">
            <InputField type="number" setValue={setQteValue} ref={qteValueRef} placeholder="Quantité" />

            <InputSelect
              value={uniteValue}
              setValue={setUniteValue}
              options={unitéData}
              onChange={(uniteValue) => setUniteValue(uniteValue)}
              placeholder="Unité"
            />

            <InputSelect
              value={typeValue}
              setValue={setTypeValue}
              options={ingredientData}
              placeholder="Ingrédients"
            />
          </div>

          <button onClick={handleIngredient} className="green-btn my-3">
            Créer ingrédient
          </button>

          {ingredient.length > 0 && <IngredientList ingredient={ingredient} />}
        </section>


        <section>
          <p className="font-semibold mb-3">Recette liées :</p>
          <div className="md:flex items-center justify-between flex-wrap">
            <InputSelect
              value={lienRecette}
              setValue={setLienRecette}
              options={unitéData}
              onChange={(lienRecette) => setLienRecette(lienRecette)}
              placeholder="Lien recette"
            />
            <InputField type="text" setValue={setNomLienRecette} ref={nomLienRecetteRef} placeholder="Nom" />
          </div>

          <button onClick={handleRecipeLink} className="green-btn my-3">
            Créer recette
          </button>

          {lienRecetteList.length > 0 && <LienRecetteList lienRecetteList={lienRecetteList} />}
        </section>


        <section>
          <p className="font-semibold mb-3">Instructions :</p>
          <div className="flex flex-col justify-between ">
            <InputField type="text" setValue={setInstructionTitre} ref={instructionTitreRef} placeholder="Titre" />
            <textarea
              rows="4"
              className="p-2.5 my-3 w-full md:w-[30rem] resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
              placeholder="Instruction"
              onChange={(e) => setInstruction(e.target.value)}
              ref={instructionRef}>
            </textarea>

          </div>

          <button onClick={handleInstructions} className="green-btn my-3">
            Créer instruction
          </button>

          {instructionList.length > 0 && <InstructionList instructionList={instructionList} />}
        </section>


        <section>
          <p className="font-semibold mb-3">Fait nutritionnels :</p>
          <SwitchBtn setValue={setNutriOn} value={nutriOn} id="nutri" label="Afficher les faits nutritionnels" />

          <div className="md:flex items-center justify-between flex-wrap">
            <InputField type="text" setValue={setGlucides} ref={glucideRef} placeholder="Glucides" isDisabled={!nutriOn} />
            <InputField type="text" setValue={setProteines} ref={proteineRef} placeholder="Protéines" isDisabled={!nutriOn} />
            <InputField type="text" setValue={setGraisses} ref={graisseRef} placeholder="Graisses" isDisabled={!nutriOn} />
            <InputField type="number" setValue={setKcal} ref={kcalRef} placeholder="Kcal" isDisabled={!nutriOn} />
          </div>
        </section>


        <section>
          <p className="font-semibold mb-3">Référencement Google :</p>

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

        </section>

        <div className="w-full mt-4 text-center">
          <button className="green-btn">Sauvgarder</button>
        </div>

        <div className="w-full text-end">
          <ScrollToTop />
        </div>

      </form>

    </main>
  )
}

export default Page