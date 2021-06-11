export default {
    routes: [
        // routes for Roles
        {
            name: 'Role',
            path: "security/roles",
            component: () => import("../../views/modules/security/roles")
        },
        {
            name: 'Role Register',
            path: "security/roles/register",
            component: () => import("../../views/modules/security/roles/register")
        },
        {
            name: 'Role Edit',
            path: "security/roles/edit/:id",
            props: true,
            component: () => import("../../views/modules/security/roles/register")
        },


        // routes for user
        {
            name: 'User',
            path: "security/user",
            component: () => import("../../views/modules/security/user")
        },
        {
            name: 'User Register',
            path: "security/user/register",
            component: () => import("../../views/modules/security/user/register")
        },
        {
            name: 'User Edit',
            path: "security/user/edit/:id",
            props: true,
            component: () => import("../../views/modules/security/user/register")
        }
    ],



    menu: {
        group: '/security',
        title: 'Seguridad',
        icon: 'mdi-lock',
        children: [
            {
                title: "Roles",
                icon: "mdi-account",
                to: "roles",
            },
            {
                title: "Usuario",
                icon: "mdi-account",
                to: "user",
            },
        ]
    }

}