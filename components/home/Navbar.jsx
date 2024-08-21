import Image from "next/image"
import Link from "next/link"
import logo from "@/public/logo.svg"
import profil from "@/public/home/profil.svg"
import notify from "@/public/home/notify.svg"
import save from "@/public/home/save.svg"
import DropDown from "./DropDown"
import prisma from "@/lib/db"


const getMenu = async () => {
    return await prisma.editableMenu.findMany({
      include: {
        subtitle: true
      },
      orderBy: {
        id: 'desc', 
      }
    })
  };



const Navbar = async () => {

    const menu =  await getMenu();


    return (
        <nav className="flex items-center justify-between">

            <Image
                src={logo}
                className='w-36'
                alt="logo"
            />

            <ul className="flex items-center justify-between text-lg w-[75%] text-darkblue">
                {menu.map((el) => {
                    return <DropDown key={el.id} items={el} />
                })}
            <li>
                    <Link href="" className="flex items-center">
                        <span>وصفاتي</span>
                        <Image
                            src={save}
                            alt="save"
                        />
                    </Link>
                </li>
                <li>
                    <Link href="">
                       By TT ياحلاوة
                    </Link>
                </li>
                <li>
                    <Link href="" className="flex items-center">
                        <span>إشعار</span>
                        <Image
                            src={notify}
                            alt="notify"
                        />
                    </Link>
                </li>
                <li>
                    <Link href="" className="flex items-center">
                        <span>تسجيل الدخول</span>
                        <Image
                            src={profil}
                            alt="profil"
                            // className="pb-1"
                        />
                    </Link>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar