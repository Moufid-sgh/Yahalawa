import React from 'react'

const SearchBar = () => {
  return (
    <>
        <input
          type="text"
          placeholder="Search..."
          className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 my-3 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
        />
    </>
  )
}

export default SearchBar