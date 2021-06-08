export default {
    routes: [
        // Commerce
        {
            name: 'Commerce',
            path: "configuration/commerce",
            component: () => import("../../views/modules/configuration/commerce")
        },
        {
            name: 'Commerce Register',
            path: "configuration/commerce/register",
            component: () => import("../../views/modules/configuration/commerce/Register")
        },
        {
            name: 'Commerce Edit',
            path: "configuration/commerce/edit/:id",
            props: true,
            component: () => import("../../views/modules/configuration/commerce/Register")
        },
        // Commerce Type
        {
            name: 'Commerce Type',
            path: "configuration/commerce-type",
            component: () => import("../../views/modules/configuration/commerceType")
        },
        {
            name: 'Commerce Type Register',
            path: "configuration/commerce-type/register",
            component: () => import("../../views/modules/configuration/commerceType/Register")
        },
        {
            name: 'Commerce Type Edit',
            path: "configuration/commerce-type/edit/:id",
            props: true,
            component: () => import("../../views/modules/configuration/commerceType/Register")
        },
        // Payment Types
        {
            name: 'Payment Type',
            path: "configuration/payment-type",
            component: () => import("../../views/modules/configuration/paymentType")
        },
        {
            name: 'Payment Type Register',
            path: "configuration/payment-type/register",
            component: () => import("../../views/modules/configuration/paymentType/Register")
        },
        {
            name: 'Payment Type Edit',
            path: "configuration/payment-type/edit/:id",
            props: true,
            component: () => import("../../views/modules/configuration/paymentType/Register")
        },

        // Roles
        {
            name: 'Role',
            path: "configuration/roles",
            component: () => import("../../views/modules/configuration/roles")
        },
        {
            name: 'Role Register',
            path: "configuration/roles/register",
            component: () => import("../../views/modules/configuration/roles/register")
        },
        {
            name: 'Role Edit',
            path: "configuration/roles/edit/:id",
            props: true,
            component: () => import("../../views/modules/configuration/roles/register")
        },
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
                title: "Comercio",
                icon: "mdi-comment-outline",
                to: "commerce",
            },
            {
                title: "Tipos de Pago",
                icon: "mdi-comment-outline",
                to: "payment-type",
            },
            {
                title: "Roles",
                icon: "mdi-comment-outline",
                to: "roles",
            },
            // {
            //     title: "Referencias",
            //     icon: "mdi-comment-outline",
            //     to: "references",
            // }
        ]
    }

}