export default {
    routes: [

        // routes for promotion
        {
            name: 'Promotion',
            path: "promotions/promotion",
            component: () => import("../../views/modules/promotions/promotion")
        },
        {
            name: 'Promotion Register',
            path: "promotions/promotion/register",
            component: () => import("../../views/modules/promotions/promotion/register")
        },
        {
            name: 'Promotion Edit',
            path: "promotions/promotion/edit/:id",
            props: true,
            component: () => import("../../views/modules/promotions/promotion/register")
        },
        {
            name: 'Promotion Entities',
            path: "promotions/promotion/entities/:id",
            props: true,
            component: () => import("../../views/modules/promotions/promotionEntitie/register")
        },


    ],



    menu: {
        group: '/promotions',
        title: 'Promociones',
        icon: 'mdi-basket',
        children: [
            {
                title: "Promociones",
                icon: "mdi-comment-outline",
                to: "promotion",
            }

        ]
    }

}