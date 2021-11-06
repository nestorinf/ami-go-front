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
        {
            name: 'Order Control Driver',
            path: "order-control/driver",
            component: () => import("../../views/modules/orderControl/driver")
        },
        {
            name: 'Order Control Driver Details',
            path: "order-control/driver/:id",
            props: true,
            component: () => import("../../views/modules/orderControl/driverDetails")
        },
        {
            name: 'Order Control Global Commerce',
            path: "order-control/orders",
            component: () => import("../../views/modules/orderControl/commercesGlobal")
        },
        {
            name: 'Order Control Driver Details',
            path: "order-control/orders/:type/:id",
            props: true,
            component: () => import("../../views/modules/orderControl/commercesDetailsOrders")
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
            },
            {
                title: "Reporte Ganancia Driver",
                icon: "mdi-comment-outline",
                to: "driver",
            },
            {
                title: "Reporte Ganancia Por Comercios",
                icon: "mdi-comment-outline",
                to: "orders",
            }

        ]
    }

}