import React from 'react'

const SearchBar = () => {
  return (
    <>
        <input
          type="text"
          placeholder="Search..."
          className="w-72 md:w-80 rounded-md border-2 border-gray py-2 px-4 outline-none focus:border-2 focus:border-blue"
        />
    </>
  )
}

export default SearchBar