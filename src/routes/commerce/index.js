export default {

    routes: [
        // routes for  Commerce
        {
            name: 'Commerce',
            path: "commerce/commerce",
            component: () => import("../../views/modules/commerce/commerce")
        },
        {
            name: 'Commerce Register',
            path: "commerce/commerce/register",
            component: () => import("../../views/modules/commerce/commerce/Register")
        },
        {
            name: 'Commerce Edit',
            path: "commerce/commerce/edit/:id",
            props: true,
            component: () => import("../../views/modules/commerce/commerce/Register")
        },
        // routes for category Commerce
        {
            name: 'Category Commerce',
            path: "commerce/commerce-category",
            component: () => import("../../views/modules/commerce/commerceType")
        },
        {
            name: 'Category Commerce Register',
            path: "commerce/commerce-category/register",
            component: () => import("../../views/modules/commerce/commerceType/Register")
        },
        {
            name: 'Category Commerce Edit',
            path: "commerce/commerce-category/edit/:id",
            props: true,
            component: () => import("../../views/modules/commerce/commerceType/Register")
        },




    ],
    menu: {
        group: '/commerce',
        title: 'Comercio',
        icon: 'mdi-store',
        children: [
            {
                title: "Categoria de Comercio",
                icon: "mdi-comment-outline",
                to: "commerce-category",
            },

            {
                title: "Comercio",
                icon: "mdi-comment-outline",
                to: "commerce",
            },

        ]
    }
};
