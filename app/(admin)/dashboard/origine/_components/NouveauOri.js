'use client'

import InputField from "../../_components/inputs/InputField"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UploadFile from "../../_components/UploadFile"



const NouveauOri = ({ setNewTitre, setPhoto }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button variant="outline" className="green-btn">&#10009; Ajouter une origine</button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center">

                <DialogHeader>
                    <DialogTitle className="text-xl">Nouvelle origine</DialogTitle>
                </DialogHeader>

                <form className="flex flex-col items-center space-y-3 w-fit">
                    <InputField type="text" setValue={setNewTitre} placeholder="Nom" />
                    <UploadFile type="image" accept="image/jpeg, image/png, image.webp" />
                </form>

                <div className="flex justify-center mt-4">
                    <DialogFooter>
                        <button className="green-btn text-sm" type="submit">Sauvgarder</button>
                    </DialogFooter>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default NouveauOri







