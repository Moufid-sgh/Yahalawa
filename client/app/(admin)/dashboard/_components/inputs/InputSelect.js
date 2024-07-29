import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })


const InputSelect = ({value, setValue, options, isMulti, placeholder, isDisabled}) => {

  return (
    <>
        <Select
            onChange={(value) => setValue(value)}
            value={value}
            options={options}
            placeholder={<div className="text-[#9CA3BC]">{placeholder}</div>}
            className="w-72 md:w-96 my-3"
            classNamePrefix="my-react-select"
            isClearable={true}
            isMulti={isMulti}
            isDisabled={isDisabled}
            components={{
              IndicatorSeparator: () => null
            }}
          />
    </>
  )
}

export default InputSelect