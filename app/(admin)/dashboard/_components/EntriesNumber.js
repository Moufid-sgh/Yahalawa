'use client'

import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })



const EntriesNumber = ({ setEntriesValue, entriesValue, entriesOptions }) => {


  return (
    <div className="flex items-center text-sm space-x-2">
      <Select
        onChange={(entriesValue) => setEntriesValue(entriesValue)}
        value={entriesValue}
        options={entriesOptions}
        className="w-[85px] text-sm"
        classNamePrefix="my-react-select"
        components={{
          IndicatorSeparator: () => null
        }}
      />
      <span>Entries Per Page</span>
    </div>
  )
}

export default EntriesNumber