
const SearchBarHome = () => {
  return (
    <div dir="rtl" className="relative mt-3">
        <input
          dir="rtl"
          type="text"
          placeholder="البحث بالاسم، أو المكونات، أو الفئة"
          className="w-72 md:w-96 rounded-md border border-gray bg-[#E2E9F1] py-2 px-10 my-3 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
        //   onChange={(e) => handleSearch(e.target.value)}
        //   defaultValue={searchParams.get('query')?.toString()}
        />

<svg xmlns="http://www.w3.org/2000/svg" className="absolute top-5 right-2" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="none" stroke="#183153" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"/></svg>
    </div>
  )
}

export default SearchBarHome