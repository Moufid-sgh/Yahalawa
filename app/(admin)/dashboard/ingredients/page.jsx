import { GetIngredient } from "./_components/GetIngredient"
import SearchBar from "../_components/SearchBar"
import NewIngredient from "./_components/NewIngredient"

const IngredientsPage = async ({ searchParams }) => {

  const query = searchParams?.query || ''

  const page = parseInt(searchParams.page || '1')
 
  return (
    <main className='ml-12 mt-8'>

      <h1 className="text-2xl font-semibold tracking-wide mb-4">Ingredients</h1>

      <div className="bg-white rounded-md mb-2">
        <div className="md:flex items-center justify-between px-2 py-1.5">
          <SearchBar />
          <NewIngredient />
        </div>
      </div>

      <GetIngredient page={page} query={query} />
    </main>
  )
}

export default IngredientsPage

