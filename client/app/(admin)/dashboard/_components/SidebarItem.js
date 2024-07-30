import home from '@/public/dashboard/home.svg'
import flag from '@/public/dashboard/flag.svg'
import recipes from '@/public/dashboard/knife-fork.svg'
import user from '@/public/dashboard/user.svg'
import premium from '@/public/dashboard/premium.svg'
import webite from '@/public/dashboard/website.svg'

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
                    title: 'Catégories',
                    href: '/dashboard/categories'
                },
                {
                    title: 'Difficultés',
                    href: '/dashboard/difficultes'
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
            title: 'Premium TT',
            icon: premium,
            href: '/dashboard/premiumTT',
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
        title: 'Website',
        icon: webite,
        href: '/dashboard/premiumTT',
    },
]

export default SidebarItem