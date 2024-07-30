'use client'

import useStore from "@/app/store"
import SearchBar from "../_components/SearchBar"
import Actions from "../_components/Actions"
import { useState, useRef } from "react"
import ScrollToTop from "../_components/ScrollToTop"
import NouveauOri from "./_components/NouveauOri"

const Page = () => {

  const navExpanded = useStore((state) => state.navExpanded)


  //Nouveelle origine
  const [titre, setTitre] = useState('')
  const [photo, setPhoto] = useState('')



  return (
    <div className={`${navExpanded ? 'ml-56' : 'ml-12'} mt-8 transition-all duration-500`}>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold tracking-wide">Origine</h1>
        <NouveauOri setTitre={setTitre} setPhoto={setPhoto} />
      </div>

      <div className="bg-white rounded-md">
        <div className="md:flex items-center justify-between p-4">
          <SearchBar />

        </div>


        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray">
            <thead className="text-sm lg:text-base">
              <tr>
                <th className="px-4 py-2 text-left">Id</th>
                <th className="px-4 py-2 text-left">Titre</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 w-40 text-left">Actions</th>
              </tr>
            </thead>
            {/* Row **********/}

            {
              [...Array(43).keys()].map((el, i) => {
                return (
                    <tbody key={i} className="bg-white text-sm divide-y divide-gray text-darkgray">
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap">{i + 1}</td>
                        <td className="px-4 py-2">اسبانية	</td>
                        <td className="px-4 py-2">Image</td>
                        <td className="px-4 py-2 whitespace-nowrap flex flex-col w-40 space-y-2">
                          <Actions />
                        </td>
                      </tr>
                    </tbody>
                )
              })
            }

          </table>
        </div>

        <div className="flex justify-end p-2 mt-4">
          <ScrollToTop />
        </div>

      </div>

    </div>
  )
}

export default Page