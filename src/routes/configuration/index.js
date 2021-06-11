export default {
<<<<<<< HEAD
  routes: [
    // Commerce
    {
      name: "Commerce",
      path: "configuration/commerce",
      component: () => import("../../views/modules/configuration/commerce"),
    },
    {
      name: "Commerce Register",
      path: "configuration/commerce/register",
      component: () =>
        import("../../views/modules/configuration/commerce/Register"),
    },
    {
      name: "Commerce Edit",
      path: "configuration/commerce/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/commerce/Register"),
    },
    // Commerce Type
    {
      name: "Commerce Type",
      path: "configuration/commerce-type",
      component: () => import("../../views/modules/configuration/commerceType"),
    },
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
    // Payment Types
    {
      name: "Payment Type",
      path: "configuration/payment-type",
      component: () => import("../../views/modules/configuration/paymentType"),
    },
    {
      name: "Payment Type Register",
      path: "configuration/payment-type/register",
      component: () =>
        import("../../views/modules/configuration/paymentType/Register"),
    },
    {
      name: "Payment Type Edit",
      path: "configuration/payment-type/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/paymentType/Register"),
    },

    // Roles
    {
      name: "Role",
      path: "configuration/roles",
      component: () => import("../../views/modules/configuration/roles"),
    },
    {
      name: "Role Register",
      path: "configuration/roles/register",
      component: () =>
        import("../../views/modules/configuration/roles/register"),
    },
    {
      name: "Role Edit",
      path: "configuration/roles/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/roles/register"),
    },

    // restaunrat types
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
    // reference
    {
      name: "Reference",
      path: "configuration/reference",
      component: () => import("../../views/modules/configuration/reference"),
    },
    {
      name: "Reference Register",
      path: "configuration/reference/register",
      component: () =>
        import("../../views/modules/configuration/reference/Register"),
    },
    {
      name: "Reference Edit",
      path: "configuration/reference/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/reference/Register"),
    },
    // reference List
    {
      name: "Reference List",
      path: "configuration/reference-list",
      component: () =>
        import("../../views/modules/configuration/referenceList"),
    },
    {
      name: "Reference List Register",
      path: "configuration/reference-list/register",
      component: () =>
        import("../../views/modules/configuration/referenceList/Register"),
    },
    {
      name: "Reference List Edit",
      path: "configuration/reference-list/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/referenceList/Register"),
    },
  ],
=======

  routes: [],
>>>>>>> develop
  menu: {
    group: "/configuration",
    title: "Configuración",
    icon: "mdi-cog",
    children: [
      {
        title: "Referencia",
<<<<<<< HEAD
        icon: "mdi-comment-outline",
        to: "reference",
      },
      {
        title: "Lista Referencia",
        icon: "mdi-comment-outline",
        to: "reference-list",
      },
      {
        title: "Tipo de Comercio",
=======
>>>>>>> develop
        icon: "mdi-comment-outline",
        to: "refecence",
      },
      {
        title: "Lista Referencia",
        icon: "mdi-comment-outline",
<<<<<<< HEAD
        to: "restaurant-type",
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
    ],
  },
=======
        to: "refecence-list",
      }

    ]
  }
>>>>>>> develop
};
