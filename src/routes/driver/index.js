export default {

    routes: [
        {
            name: 'Drivers',
            path: "drivers",
            component: () => import("../../views/modules/drivers/driver")
        },
        {
            name: 'Driver Register',
            path: "driver/register",
            component: () => import("../../views/modules/drivers/driver/register")
        },        
        {
            name: "Driver Edit",
            path: "driver/edit/:id",
            props: true,
            component: () => import("../../views/modules/drivers/driver/register"),
        },
        {
            name: 'Driver Car Register',
            path: "driver/car/:id",
            props: true,
            component: () => import("../../views/modules/drivers/driver/car")
        },  
    ],

    menu: {
        group: "/",
        model: false,
        icon: "mdi-car",
        to: '/drivers',
        title: "Conductores",
        roles: ['ROLE_ROOT']

    }
}
