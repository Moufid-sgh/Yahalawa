import Image from "next/image"
import Link from "next/link"
import logo from "@/public/logo.svg"
import profil from "@/public/home/profil.svg"
import notify from "@/public/home/notify.svg"
import save from "@/public/home/save.svg"
import DropDown from "./DropDown"
import prisma from "@/lib/db"


const getMenuSucrerie = async () => {
        return await prisma.menuSucrerie.findMany({
            include: {
                subtitle: true
            }
        })
};


const getMenuCuisine = async () => {
        return await prisma.menuCuisine.findMany({
            include: {
                subtitle: true
            }
        })
};

const getMenuConseil = async () => {
        return await prisma.menuConseil.findMany({
            include: {
                subtitle: true
            }
        })
};


const Navbar = async () => {

    const menuSucrerie =  await getMenuSucrerie();
    const menuCuisine =  await getMenuCuisine();
    const menuConseil =  await getMenuConseil();


    return (
        <nav className="flex items-center space-x-12">

            <Image
                src={logo}
                className='w-36'
                alt="logo"
            />

            <ul className="flex items-center space-x-10 text-lg text-darkblue">
                <DropDown items={menuConseil} />
                <DropDown items={menuCuisine} />
                <DropDown items={menuSucrerie} />
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