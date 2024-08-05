'use client'


const Pagination = ({ setCurrentPage, currentPage, totalPages }) => {


  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleNextPage = (e) => {
    e.preventDefault()
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  const handlePrevPage = (e) => {
    e.preventDefault()
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }


  const getPaginationButtons = () => {
    let buttons = []
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i)
      }
    } else {
      if (currentPage === 1) {
        buttons = [1, 2, 3]
      } else if (currentPage === totalPages) {
        buttons = [totalPages - 2, totalPages - 1, totalPages]
      } else {
        buttons = [currentPage - 1, currentPage, currentPage + 1]
      }
    }
    return buttons;
  }



  return (
    <div className='border-t border-gray p-4'>

      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="px-3 py-1 mr-2 rounded hover:bg-darkblue hover:text-white"
      >
        &#10094;
      </button>



      {getPaginationButtons().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${currentPage === page ? 'bg-darkblue text-white' : 'bg-gray-300 hover:bg-gray-400'} px-3 py-1 mx-1 rounded hover:bg-darkblue hover:text-white`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 ml-2 rounded hover:bg-darkblue hover:text-white disabled:text-blue"
      >
        &#10095;
      </button>
      
    </div>
 
  )
}

export default Pagination