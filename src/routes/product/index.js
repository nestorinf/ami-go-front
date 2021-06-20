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
                title: "Producto",
                icon: "mdi-comment-outline",
                to: "product",
            }

        ]
    }

}