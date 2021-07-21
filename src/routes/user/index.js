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
            path: "security/user/:type",
            props: true,
            component: () => import("../../views/modules/security/user")
        },        
        {
            name: 'User Register',
            path: "security/user/:type/register",
            props: true,
            component: () => import("../../views/modules/security/user/register")
        },
        {
            name: 'User Edit',
            path: "security/user/:type/edit/:id",
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
                title: "Usuarios",
                icon: "mdi-account",
                to: "user/admin",
            },
            {
                title: "Usuarios Comercios",
                icon: "mdi-account",
                to: "user/commerces",
            },
            {
                title: "Usuarios Restaurantes",
                icon: "mdi-account",
                to: "user/restaurants",
            },
        ]
    }

}