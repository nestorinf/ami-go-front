export default {
    path: '/',
    name: "Home",

    component: () => import("@/layouts/full-layout/Layout"),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import("@/views/dashboards/classic/Classic")

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
