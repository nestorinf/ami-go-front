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
        },
        {
            name: 'Commerce Type',
            path: "configuration/commerce-type",
            component: () => import("../../views/modules/configuration/commerceType")
        },
        {
            name: 'Commerce Type Register',
            path: "configuration/commerce-type/register",
            component: () => import("../../views/modules/configuration/commerceType/Register")
        }
    ],



    menu: {
        group: '/configuration',
        title: 'Configuración',
        icon: 'mdi-cog',
        children: [
            {
                title: "Tipo de Comercio",
                icon: "mdi-comment-outline",
                to: "commerce-type",
            },
            {
                title: "Compañia",
                icon: "mdi-comment-outline",
                to: "company",
            },
            // {
            //     title: "Referencias",
            //     icon: "mdi-comment-outline",
            //     to: "references",
            // }
        ]
    }

}