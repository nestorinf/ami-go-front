export default {
    routes: [
        // routes for Food categories
        {
            name: 'Food Category',
            path: "food/food-category",
            component: () => import("../../views/modules/food/foodCategory"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        },
        {
            name: 'Food Category Register',
            path: "food/food-category/register",
            component: () => import("../../views/modules/food/foodCategory/Register"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        },
        {
            name: 'Food Category Edit',
            path: "food/food-category/edit/:id",
            props: true,
            component: () => import("../../views/modules/food/foodCategory/Register"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        },

        // routes for Food features
        {
            name: 'Food Type Features',
            path: "food/food-type-features",
            component: () => import("../../views/modules/food/foodTypeFeature"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        },
        {
            name: 'Food Type Feature Register',
            path: "food/food-type-feature/register",
            component: () => import("../../views/modules/food/foodTypeFeature/Register"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        },
        {
            name: 'Food Type Feature Edit',
            path: "food/food-type-feature/edit/:id",
            props: true,
            component: () => import("../../views/modules/food/foodTypeFeature/Register"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        },


        // routes for food
        {
            name: 'Food',
            path: "food/food",
            component: () => import("../../views/modules/food/food"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        },
        {
            name: 'Food Register',
            path: "food/food/register",
            component: () => import("../../views/modules/food/food/Register"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        },
        {
            name: 'Food Type Feature Add',
            path: "food/food/features/:idfood",
            props: true,
            component: () => import("../../views/modules/food/foodFeature"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        },
        {
            name: 'Food Edit',
            path: "food/food/edit/:id",
            props: true,
            component: () => import("../../views/modules/food/food/Register"),          
            meta: {
                roles: ['ROLE_ROOT']
            }
        }
    ],



    menu: {
        group: '/food',
        title: 'Comidas',
        icon: 'mdi-basket',
        children: [
            {
                title: "Categoria de comida",
                icon: "mdi-variant",
                to: "food-category"
               
            },
            {
                title: "Tipos de características",
                icon: "mdi-variant",
                to: "food-type-features",
            },
            {
                title: "Comidas",
                icon: "mdi-burger",
                to: "food",
            },
        ]
    }

}