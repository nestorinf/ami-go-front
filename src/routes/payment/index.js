export default {

    routes: [

        // Payment Types
        {
            name: 'Payment Type',
            path: "payment/payment-type",
            component: () => import("../../views/modules/payment/paymentType")
        },
        {
            name: 'Payment Type Register',
            path: "payment/payment-type/register",
            component: () => import("../../views/modules/payment/paymentType/Register")
        },
        {
            name: 'Payment Type Edit',
            path: "payment/payment-type/edit/:id",
            props: true,
            component: () => import("../../views/modules/payment/paymentType/Register")
        },


    ],
    menu: {
        group: '/payment',
        title: 'Pagos',
        icon: 'mdi-cash',
        children: [

            {
                title: "Tipos de Pago",
                icon: "mdi-comment-outline",
                to: "payment-type",
            }

        ]
    }
};
