export default {
    routes: [
        {
            name: 'User',
            path: "user/user",
            component: () => import("../../views/modules/user/user")
        },
        {
            name: 'User Register',
            path: "user/user/register",
            component: () => import("../../views/modules/user/user/register")
        },
        {
            name: 'User Edit',
            path: "user/user/edit/:id",
            props: true,
            component: () => import("../../views/modules/user/user/register")
        }
    ],



    menu: {
        group: '/user',
        title: 'Usuario',
        icon: 'mdi-account',
        children: [
            {
                title: "Usuario",
                icon: "mdi-account",
                to: "user",
            }
        ]
    }

}