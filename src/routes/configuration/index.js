export default {
<<<<<<< HEAD
  routes: [
    {
      name: "Company",
      path: "configuration/company",
      component: () => import("../../views/modules/configuration/company"),
    },
    {
      name: "Company Register",
      path: "configuration/company/register",
      component: () =>
        import("../../views/modules/configuration/company/Register"),
    },
    {
      name: "Company Edit",
      path: "configuration/company/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/company/Register"),
    },
=======
    routes: [
        // Commerce
        {
            name: 'Commerce',
            path: "configuration/commerce",
            component: () => import("../../views/modules/configuration/commerce")
        },
        {
            name: 'Commerce Register',
            path: "configuration/commerce/register",
            component: () => import("../../views/modules/configuration/commerce/Register")
        },
        {
            name: 'Commerce Edit',
            path: "configuration/commerce/edit/:id",
            props: true,
            component: () => import("../../views/modules/configuration/commerce/Register")
        },
<<<<<<< HEAD
>>>>>>> 3c241725a8ca5dce1860514162433d479ffbc48b

    {
      name: "Commerce Type",
      path: "configuration/commerce-type",
      component: () => import("../../views/modules/configuration/commerceType"),
    },
=======
        // Commerce Type
        {
            name: 'Commerce Type',
            path: "configuration/commerce-type",
            component: () => import("../../views/modules/configuration/commerceType")
        },
        {
            name: 'Commerce Type Register',
            path: "configuration/commerce-type/register",
            component: () => import("../../views/modules/configuration/commerceType/Register")
        },
        {
            name: 'Commerce Type Edit',
            path: "configuration/commerce-type/edit/:id",
            props: true,
            component: () => import("../../views/modules/configuration/commerceType/Register")
        },
        // Payment Types
        {
            name: 'Payment Type',
            path: "configuration/payment-type",
            component: () => import("../../views/modules/configuration/paymentType")
        },
        {
            name: 'Payment Type Register',
            path: "configuration/payment-type/register",
            component: () => import("../../views/modules/configuration/paymentType/Register")
        },
        {
            name: 'Payment Type Edit',
            path: "configuration/payment-type/edit/:id",
            props: true,
            component: () => import("../../views/modules/configuration/paymentType/Register")
        },

        // Roles
        {
            name: 'Role',
            path: "configuration/roles",
            component: () => import("../../views/modules/configuration/roles")
        },
        {
            name: 'Role Register',
            path: "configuration/roles/register",
            component: () => import("../../views/modules/configuration/roles/register")
        },
        {
            name: 'Role Edit',
            path: "configuration/roles/edit/:id",
            props: true,
            component: () => import("../../views/modules/configuration/roles/register")
        },
    ],
>>>>>>> feature/payment_and_categories_forms

    {
      name: "Commerce Type Register",
      path: "configuration/commerce-type/register",
      component: () =>
        import("../../views/modules/configuration/commerceType/Register"),
    },

    {
      name: "Commerce Type Edit",
      path: "configuration/commerce-type/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/commerceType/Register"),
    },

<<<<<<< HEAD
    {
      name: "Restautant Type",
      path: "configuration/restaurant-type",
      component: () =>
        import("../../views/modules/configuration/restaurantType"),
    },
    {
      name: "Restautant Type Register",
      path: "configuration/restaurant-type/register",
      component: () =>
        import("../../views/modules/configuration/restaurantType/Register"),
    },
    {
      name: "Restautant Type Edit",
      path: "configuration/restaurant-type/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/restaurantType/Register"),
    },
  ],
=======
    menu: {
        group: '/configuration',
        title: 'Configuración',
        icon: 'mdi-cog',
        children: [
            {
                title: "Tipo de Comercio",
                icon: "mdi-comment-outline",
                to: "commerce-type",
            },
            {
                title: "Comercio",
                icon: "mdi-comment-outline",
                to: "commerce",
            },
            {
                title: "Tipos de Pago",
                icon: "mdi-comment-outline",
                to: "payment-type",
            },
            {
                title: "Roles",
                icon: "mdi-comment-outline",
                to: "roles",
            },
            // {
            //     title: "Referencias",
            //     icon: "mdi-comment-outline",
            //     to: "references",
            // }
        ]
    }
>>>>>>> 3c241725a8ca5dce1860514162433d479ffbc48b

  menu: {
    group: "/configuration",
    title: "Configuración",
    icon: "mdi-cog",
    children: [
      {
        title: "Tipo de Comercio",
        icon: "mdi-comment-outline",
        to: "commerce-type",
      },
      {
        title: "Tipo de Restaurante",
        icon: "mdi-comment-outline",
        to: "restaurant-type",
      },
      {
        title: "Compañia",
        icon: "mdi-comment-outline",
        to: "company",
      },
      // {
      //     title: "Referencias",
      //     icon: "mdi-comment-outline",
      //     to: "references",
      // }
    ],
  },
};
