import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import arrow from "@/public/chevron/chevron-down.svg"
import Image from "next/image"


const DropDown = ({items}) => {

    const { title, subtitle } = items;
    

    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger className="outline-none flex items-end">
                <p>{title}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="none" stroke="#183153" strokeLinecap="round" strokeLinejoin="round" d="m7 10l5 5l5-5"/></svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
                {
                    subtitle.map((el) => {
                        return <DropdownMenuItem key={el.id} className="text-md">{el.title}</DropdownMenuItem>
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDown