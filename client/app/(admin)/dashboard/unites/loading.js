

export default function Loading() {
    return (
      <>
        {[...Array(10).keys()].map((el, i) => {
          <tbody key={i} className="animate-pulse bg-white divide-y divide-gray text-darkgray">
            <tr>
              <td className="px-4 py-12">
                <p className='h-2 bg-lightgray rounded'></p>
              </td>
              <td className="px-3 py-12">
                <p className='h-2 bg-lightgray rounded'></p>
              </td>
              <td className="px-4 py-12">
                <p className='h-2 bg-lightgray rounded'></p>
              </td>
            </tr>
          </tbody>
        })
        }
      </>
  
    )
  }
  