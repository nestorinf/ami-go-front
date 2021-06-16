export default {

    routes: [
        {
            name: 'Department',
            path: "location/department",
            component: () => import("../../views/modules/location/department")
        },
        {
            name: 'Department Register',
            path: "location/department/register",
            component: () => import("../../views/modules/location/department/register")
        },
        {
            name: 'Department Edit',
            path: "location/department/edit/:id",
            props: true,
            component: () => import("../../views/modules/location/department/register")
        },
        {
            name: 'Municipality',
            path: "location/municipality",
            component: () => import("../../views/modules/location/municipality")
        },
        {
            name: 'Municipality Register',
            path: "location/municipality/register",
            component: () => import("../../views/modules/location/municipality/register")
        },
        {
            name: 'Municipality Edit',
            path: "location/municipality/edit/:id",
            props: true,
            component: () => import("../../views/modules/location/municipality/register")
        },
    ],
    menu: {
        group: '/location',
        title: 'Ubicaciones',
        icon: 'mdi-google-maps',
        children: [

            {
                title: "Pais",
                icon: "mdi-comment-outline",
                to: "country",
            },
            {
                title: "Departamentos",
                icon: "mdi-office-building-location-outline",
                to: "department",
            },
            {
                title: "Municipios",
                icon: "mdi-location-city",
                to: "municipality",
            },

        ]
    }
};
