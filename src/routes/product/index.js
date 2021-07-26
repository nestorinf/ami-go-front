export default {
    routes: [

        // routes for product
        {
            name: 'Product',
            path: "products/product",
            component: () => import("../../views/modules/products/product")
        },
        {
            name: 'Product Register',
            path: "products/product/register",
            component: () => import("../../views/modules/products/product/register")
        },
        {
            name: 'Product Edit',
            path: "products/product/edit/:id",
            props: true,
            component: () => import("../../views/modules/products/product/register")
        },


        // routes for categories
        {
            name: 'Category',
            path: "products/categories",
            component: () => import("../../views/modules/products/category")
        },
        {
            name: 'Category Register',
            path: "products/categories/register",
            component: () => import("../../views/modules/products/category/register")
        },
        {
            name: 'Category Edit',
            path: "products/categories/edit/:id",
            props: true,
            component: () => import("../../views/modules/products/category/register")
        },

        // routes for categories interna
        {
            name: 'Category intern',
            path: "products/categories_intern",
            component: () => import("../../views/modules/products/categoryInterna")
        },
        {
            name: 'Category Register intern',
            path: "products/categories_intern/register",
            component: () => import("../../views/modules/products/categoryInterna/register")
        },
        {
            name: 'Category Edit intern',
            path: "products/categories_intern/edit/:id",
            props: true,
            component: () => import("../../views/modules/products/categoryInterna/register")
        },

        
        // routes for Lotes
        {
            name: 'products Batches',
            path: "products/batches",
            component: () => import("../../views/modules/products/batches")
        },
        {
            name: 'products Batches Register',
            path: "products/batches/register",
            component: () => import("../../views/modules/products/batches/register")
        },
        {
            name: 'products Batches Edit',
            path: "products/batches/edit/:id",
            props: true,
            component: () => import("../../views/modules/products/batches/register")
        }
    ],



    menu: {
        group: '/products',
        title: 'Productos',
        icon: 'mdi-basket',
        children: [
            {
                title: "Categoria",
                icon: "mdi-comment-outline",
                to: "categories",
            },
            {
                title: "Categoria Internas",
                icon: "mdi-comment-outline",
                to: "categories_intern",
            },
            {
                title: "Producto",
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