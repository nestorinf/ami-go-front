export default {
    routes: [
        // restaunrat types
        {
            name: "Restautant Type",
            path: "restaurant/restaurant-type",
            component: () =>
                import("../../views/modules/restaurant/restaurantType"),
        },
        {
            name: "Restautant Type Register",
            path: "restaurant/restaurant-type/register",
            component: () =>
                import("../../views/modules/restaurant/restaurantType/Register"),
        },
        {
            name: "Restautant Type Edit",
            path: "restaurant/restaurant-type/edit/:id",
            props: true,
            component: () =>
                import("../../views/modules/restaurant/restaurantType/Register"),
        },
        {
            name: 'Restaurant',
            path: "restaurant/restaurant",
            component: () => import("../../views/modules/restaurant/restaurant")
        },
        {
            name: 'Restaurant Register',
            path: "restaurant/restaurant/register",
            component: () => import("../../views/modules/restaurant/restaurant/register")
        },
        {
            name: 'Restaurant Edit',
            path: "restaurant/restaurant/edit/:id",
            props: true,
            component: () => import("../../views/modules/restaurant/restaurant/register")
        }
    ],



    menu: {
        group: '/restaurant',
        title: 'Restaurantes',
        icon: 'mdi-food',
        children: [
            {
                title: "Tipo de Restaurante",
                icon: "mdi-comment-outline",
                to: "restaurant-type",
            },
            {
                title: "Restaurantes",
                icon: "mdi-store",
                to: "restaurant",
            }
        ]
    }
};
