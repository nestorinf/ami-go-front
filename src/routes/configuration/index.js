export default {
    name: 'Company',
    path: "configuration/company",
    component: () => import("../../views/modules/configuration/company"),



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
    },
    children: [
        {

            path: "register",
            component: () => import("../../views/modules/configuration/company/Register.vue"),

        },
    ],

}