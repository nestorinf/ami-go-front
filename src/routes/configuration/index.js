export default {
    routes: [
        {
            name: 'Company',
            path: "configuration/company",
            component: () => import("../../views/modules/configuration/company")
        },
        {
            name: 'Company Register',
            path: "configuration/company/register",
            component: () => import("../../views/modules/configuration/company/Register")
        }
    ],



    menu: {
        group: '/configuration',
        title: 'Configuración',
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