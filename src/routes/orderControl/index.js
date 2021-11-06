export default {
    routes: [

        // routes for promotion
        {
            name: 'Order Control',
            path: "order-control/index",
            component: () => import("../../views/modules/orderControl/index")
        },
        {
            name: 'Show Order Control',
            path: "order-control/edit/:type/:id",
            props: true,
            component: () => import("../../views/modules/orderControl/edit")
        },
        // {
        //     name: 'Promotion Edit',
        //     path: "promotions/promotion/edit/:id",
        //     props: true,
        //     component: () => import("../../views/modules/promotions/promotion/register")
        // },
        // {
        //     name: 'Promotion Entities',
        //     path: "promotions/promotion/entities/:id",
        //     props: true,
        //     component: () => import("../../views/modules/promotions/promotionEntitie/register")
        // },


    ],



    menu: {
        group: '/order-control',
        title: 'Control de Ordenes',
        icon: 'mdi-check',
        children: [
            {
                title: "Control de Ordenes",
                icon: "mdi-comment-outline",
                to: "index",
            }

        ]
    }

}