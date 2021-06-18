export default {
    routes: [
        // routes for Foods
        {
            name: 'Food Category',
            path: "food/food-category",
            component: () => import("../../views/modules/food/foodCategory")
        },
        {
            name: 'Food Category Register',
            path: "food/food-category/register",
            component: () => import("../../views/modules/food/foodCategory/Register")
        },
        {
            name: 'Food Category Edit',
            path: "food/food-category/edit/:id",
            props: true,
            component: () => import("../../views/modules/food/foodCategory/Register")
        },


        // routes for food
        // {
        //     name: 'Food',
        //     path: "food/food",
        //     component: () => import("../../views/modules/food/food")
        // },
        // {
        //     name: 'Food Register',
        //     path: "food/food/register",
        //     component: () => import("../../views/modules/food/food/register")
        // },
        // {
        //     name: 'Food Edit',
        //     path: "food/food/edit/:id",
        //     props: true,
        //     component: () => import("../../views/modules/food/food/register")
        // }
    ],



    menu: {
        group: '/food',
        title: 'Comidas',
        icon: 'mdi-basket',
        children: [
            {
                title: "Tipos de comida",
                icon: "mdi-variant",
                to: "food-category",
            },
            // {
            //     title: "Comidas",
            //     icon: "mdi-burger",
            //     to: "food",
            // },
        ]
    }

}