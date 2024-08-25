'use client'

import { useState } from "react"
import SwitchBtn from "../../_components/SwitchBtn"

const FaitNutri = () => {

    const [nutriOn, setNutriOn] = useState(false)

    return (
        <section>
            <p className="font-semibold mb-3">Fait nutritionnels :</p>
            <SwitchBtn setValue={setNutriOn} value={nutriOn} id="nutri" label="Afficher les faits nutritionnels" />

            <div className="md:flex items-center justify-between flex-wrap space-y-8">
                <div className="flex items-center space-x-6">
                    <input
                        type="number"
                        placeholder="Glucides"
                        name="glucides"
                        className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        disabled={!nutriOn}
                    />

                    <input
                        type="number"
                        placeholder="Protéines"
                        name="proteines"
                        className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        disabled={!nutriOn}
                    />
                </div>

                <div className="flex items-center space-x-6">
                    <input
                        type="number"
                        placeholder="Graisses"
                        name="graisses"
                        className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        disabled={!nutriOn}
                    />

                    <input
                        type="number"
                        placeholder="Kcal"
                        name="Kcal"
                        className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        disabled={!nutriOn}
                    />
                </div>
            </div>
        </section>
    )
}

export default FaitNutri