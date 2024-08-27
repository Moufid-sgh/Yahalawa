import home from '@/public/dashboard/home.svg'
import flag from '@/public/dashboard/flag.svg'
import recipes from '@/public/dashboard/knife-fork.svg'
import user from '@/public/dashboard/user.svg'
import premium from '@/public/dashboard/premium.svg'
import menu from '@/public/dashboard/menu.svg'
import webite from '@/public/dashboard/website.svg'
import parametres from '@/public/dashboard/parametres.svg'
import pages from '@/public/dashboard/pages.svg'


    const SidebarItem = [
        {
            title: 'Home',
            icon: home,
            href: '/dashboard/home',
        },
        {
            title: 'Recettes',
            icon: recipes,
            subtitle: [
                {
                    title: 'Recettes',
                    href: '/dashboard/recettes'
                },
                {
                    title: 'Nouvelle recette',
                    href: '/dashboard/nouvelle_recette'
                },
                {
                    title: 'Catégories',
                    href: '/dashboard/categories'
                },
                {
                    title: 'Ingrédients',
                    href: '/dashboard/ingredients'
                },
                {
                    title: 'Unités',
                    href: '/dashboard/unites'
                },
                {
                    title: 'Ustensiles',
                    href: '/dashboard/ustensiles'
                },
                {
                    title: 'Origine',
                    href: '/dashboard/origine'
                },
                {
                    title: 'Tags',
                    href: '/dashboard/tag'
                },
            ],
        },
        {
            title: 'Tips',
            icon: flag,
            subtitle: [
                {
                    title: 'Gestion',
                    href: '/dashboard/gestion_tips'
                },
                {
                    title: 'Catégories',
                    href: '/dashboard/categories_tips'
                },
            ],
        },
        {
            title: 'T-Telecom',
            icon: premium,
            href: '/dashboard/t-Telecom',
        },
    {
        title: 'Utilisateurs',
        icon: user,
        subtitle: [
            {
                title: 'Yahalawa users',
                href: '/dashboard/yahalawa_users'
            },
            {
                title: 'TT users',
                href: '/dashboard/tt_users'
            },
        ],
    },
    {
        title: 'Menu',
        icon: menu,
        href: '/dashboard/gestion_menu'
    },
    {
        title: 'Pages',
        icon: pages,
        href: '/dashboard/pages',
    },
    {
        title: 'Website',
        icon: webite,
        href: '/',
    },
    {
        title: 'Parametres',
        icon: parametres,
        href: '/dashboard/parametres',
    },
]

export default SidebarItem