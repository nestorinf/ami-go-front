export default {

    routes: [],
    menu: {
        group: '/location',
        title: 'Ubicaciones',
        icon: 'mdi-google-maps',
        children: [

            {
                title: "Pais",
                icon: "mdi-comment-outline",
                to: "country",
            }

        ]
    }
};
