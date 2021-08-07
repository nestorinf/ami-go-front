export default {
    routes: [

        // routes for product
        {
            name: 'Product Market',
            path: "marketproducts/product",
            component: () => import("../../views/modules/marketproducts/product")
        },
        {
            name: 'Product Market Register',
            path: "marketproducts/product/register",
            component: () => import("../../views/modules/marketproducts/product/register")
        },
        { 
            name: 'Product Market Edit',
            path: "marketproducts/product/edit/:id",
            props: true,
            component: () => import("../../views/modules/marketproducts/product/register")
        },


        // routes for categories
        {
            name: 'Category Market',
            path: "marketproducts/categories",
            component: () => import("../../views/modules/marketproducts/category")
        },
        {
            name: 'Category Market Register',
            path: "marketproducts/categories/register",
            component: () => import("../../views/modules/marketproducts/category/register")
        },
        {
            name: 'Category Market Edit',
            path: "marketproducts/categories/edit/:id",
            props: true,
            component: () => import("../../views/modules/marketproducts/category/register")
        },

        // routes for categories interna
        {
            name: 'Category Market intern',
            path: "marketproducts/categories_intern",
            component: () => import("../../views/modules/marketproducts/categoryInterna")
        },
        {
            name: 'Category Market Register intern',
            path: "marketproducts/categories_intern/register",
            component: () => import("../../views/modules/marketproducts/categoryInterna/register")
        },
        {
            name: 'Category Market Edit intern',
            path: "marketproducts/categories_intern/edit/:id",
            props: true,
            component: () => import("../../views/modules/marketproducts/categoryInterna/register")
        },

        
        // routes for Lotes
        {
            name: 'Product Market Batches',
            path: "marketproducts/batches",
            component: () => import("../../views/modules/marketproducts/batches")
        },
        {
            name: 'Product Market Batches Register',
            path: "marketproducts/batches/register",
            component: () => import("../../views/modules/marketproducts/batches/register")
        },
        {
            name: 'Product Market Batches Edit',
            path: "marketproducts/batches/edit/:id",
            props: true,
            component: () => import("../../views/modules/marketproducts/batches/register")
        },
        {
            name: 'products Market Batches Detail',
            path: "marketproducts/batchesDetail/detail/:id",
            props: true,
            component: () => import("../../views/modules/marketproducts/batchesDetail/index")
        },

        
        // routes for product classifications


        {
            name: 'Product Market Classification',
            path: "marketproducts/classification",
            component: () => import("../../views/modules/marketproducts/classification")
        },
        {
            name: 'Product Market Classification Register',
            path: "marketproducts/classification/register",
            component: () => import("../../views/modules/marketproducts/classification/Register")
        },
        {
            name: 'Product Market Classification Edit',
            path: "marketproducts/classification/edit/:id",
            props: true,
            component: () => import("../../views/modules/marketproducts/classification/Register")
        },
    ],



    menu: {
        group: '/marketproducts',
        title: 'Productos Super mercado',
        icon: 'mdi-basket',
        children: [
            {
                title: "Categoria",
                icon: "mdi-comment-outline",
                to: "categories",
            },
            {
                title: "Clasificación",
                icon: "mdi-comment-outline",
                to: "classification",
            },
            {
                title: "Categoria Internas",
                icon: "mdi-comment-outline",
                to: "categories_intern",
            },
            {
                title: "Productos",
                icon: "mdi-comment-outline",
                to: "product",
            },
            {
                title: "Lotes",
                icon: "mdi-comment-outline",
                to: "batches",
            }

        ]
    }

}