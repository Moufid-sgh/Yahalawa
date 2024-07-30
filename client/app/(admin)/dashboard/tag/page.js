'use client'

import useStore from "@/app/store"
import SearchBar from "../_components/SearchBar"
import Actions from "../_components/Actions"
import { useState, useRef } from "react"
import Pagination from "../_components/Pagination"
import EntriesNumber from "../_components/EntriesNumber"
import ScrollToTop from "../_components/ScrollToTop"
import NouveauTag from "./_components/NouveauTag"

const Page = () => {

  const navExpanded = useStore((state) => state.navExpanded)


  const entriesOptions = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' }
  ]

  const [entriesValue, setEntriesValue] = useState(entriesOptions[0])

  // for pagination
  const itemsPerPage = entriesValue.value
  const totalItems = 43
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage


  //Nouveau tag
  const [titre, setTitre] = useState('')
  const [status, setStatus] = useState([])

  const titreRef = useRef()


  return (
    <div className={`${navExpanded ? 'ml-56' : 'ml-12'} mt-8 transition-all duration-500`}>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold tracking-wide">Tags</h1>
        <NouveauTag setTitre={setTitre} status={status} setStatus={setStatus} />
      </div>

      <div className="bg-white rounded-md">
        <div className="md:flex items-center justify-between p-4">
          <SearchBar />

          <EntriesNumber
            setEntriesValue={setEntriesValue}
            entriesValue={entriesValue}
            entriesOptions={entriesOptions}
          />
        </div>


        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray">
            <thead className="text-sm lg:text-base">
              <tr>
                <th className="px-4 py-2 text-left">Id</th>
                <th className="px-4 py-2 text-left">Titre</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 w-40 text-left">Actions</th>
              </tr>
            </thead>
            {/* Row **********/}

            {
              [...Array(43).keys()].slice(startIndex, startIndex + itemsPerPage).map((el, i) => {
                return (
                    <tbody key={i} className="bg-white text-sm divide-y divide-gray text-darkgray">
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap">{startIndex + i + 1}</td>
                        <td className="px-4 py-2">شكلاطة</td>
                        <td className="px-4 py-2">Active</td>
                        <td className="px-4 py-2 w-40 whitespace-nowrap flex flex-col space-y-2">
                          <Actions />
                        </td>
                      </tr>
                    </tbody>
                )
              })
            }

          </table>
        </div>

        <div className="flex items-center justify-between">
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />

          <ScrollToTop />
        </div>

      </div>

    </div>
  )
}

export default Page