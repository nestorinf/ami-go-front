export default {
    routes: [
        {
            name: 'Provider',
            path: "provider/provider",
            component: () => import("../../views/modules/provider/provider")
        },
        {
            name: 'Provider Register',
            path: "provider/provider/register",
            component: () => import("../../views/modules/provider/provider/register")
        },

    ],



    menu: {
        group: '/provider',
        title: 'Proveedor',
        icon: 'mdi-cog',
        children: [
            {
                title: "Proveedor",
                icon: "mdi-comment-outline",
                to: "provider",
            },


        ]
    }

}