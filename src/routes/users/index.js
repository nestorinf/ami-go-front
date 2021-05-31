export default {
    path: '/users',
    name: 'Users',
    // component: () => import("@/layouts/full-layout/Layout"), // por defecto siempre
    children: [
        {
            name: 'Company',
            path: "company",
            component: () => import("../../views/modules/configuration/company")
        }
    ],

    menu: {
        group: '/users',
        title: 'Usuarios',
        icon: 'mdi-cog',
        children: [
            {
                title: "Compañia",
                icon: "mdi-comment-outline",
                to: "company",
            },
            {
                title: "Referencias",
                icon: "mdi-comment-outline",
                to: "references",
            }
        ]
    }
}