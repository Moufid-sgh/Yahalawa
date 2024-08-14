import SearchBar from "../_components/SearchBar"
import { GetTips } from "./_components/GetTips"
import NewTips from "./_components/NewTips"

const TipsPage = async ({ searchParams }) => {

  const query = searchParams?.query || ''

  const page = parseInt(searchParams.page || '1')
 
  return (
    <main className='ml-12 mt-8'>

      <h1 className="text-2xl font-semibold tracking-wide mb-4">Tips</h1>

      <div className="bg-white rounded-md mb-2">
        <div className="md:flex items-center justify-between px-2 py-1.5">
          <SearchBar />
          <NewTips />
        </div>
      </div>

      <GetTips page={page} query={query} />
    </main>
  )
}

export default TipsPage

