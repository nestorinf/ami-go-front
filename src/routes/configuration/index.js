export default {
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
