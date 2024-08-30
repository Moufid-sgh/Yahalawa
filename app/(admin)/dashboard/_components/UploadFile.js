'use client'

import { useState } from "react"


const UploadFile = ({ type, accept, name }) => {

    const [file, setFile] = useState(null)

    return (
        <div className="size-36 overflow-hidden">
            
            <div className="absolute bg-white w-36 h-36 flex flex-col items-center justify-center border-2 border-blue border-dashed rounded-md text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="#007AFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v9m0-9l3 3m-3-3l-3 3m8.5 2c1.519 0 2.5-1.231 2.5-2.75a2.75 2.75 0 0 0-2.016-2.65A5 5 0 0 0 8.37 8.108a3.5 3.5 0 0 0-1.87 6.746" />
                </svg>
                {file ? <p className="text-sm tracking-wide">{file.name}</p> : <p className="text-sm tracking-wide">upload <br /> {type}</p>}
            </div>

            <input
                type="file"
                className="bg-white outline-none w-full h-full z-20 opacity-0"
                name={name}
                accept={accept}
                onChange={(e) => setFile(e.target.files[0])}
            />

        </div>
    )
}

export default UploadFile