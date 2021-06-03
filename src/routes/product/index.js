export default {
    routes: [
        {
            name: 'Product',
            path: "products/product",
            component: () => import("../../views/modules/products/product")
        },
        {
            name: 'Company Register',
            path: "products/product/register",
            component: () => import("../../views/modules/products/product/register")
        },
        {
            name: 'Category',
            path: "products/categories",
            component: () => import("../../views/modules/products/category")
        },
        {
            name: 'Category Register',
            path: "products/categories/register",
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
            },
            // {
            //     title: "Referencias",
            //     icon: "mdi-comment-outline",
            //     to: "references",
            // }
        ]
    }

}