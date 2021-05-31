export default {

    routes: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import("@/views/dashboards/classic/Classic"),
        }
    ],

    menu: {
        group: "/",
        model: false,
        icon: "mdi-home",
        to: '/',
        title: "Home",

    }
}
