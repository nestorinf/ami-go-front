export default {
    path: '/configuration',
    name: 'Configuration',
    component: () => import("@/layouts/full-layout/Layout"), // por defecto siempre
    children: [
        {
            name: 'Company',
            path: "company",
            component: () => import("../../views/modules/configuration/company")
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