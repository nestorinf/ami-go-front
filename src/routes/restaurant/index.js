export default {
    routes: [
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
        title: 'Restaurante',
        icon: 'mdi-store',
        children: [
            {
                title: "Restaurantes",
                icon: "mdi-store",
                to: "restaurant",
            }
        ]
    }

}