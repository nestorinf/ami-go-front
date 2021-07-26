export default {
  routes: [
    // routes for Type Restaurant
    {
      name: "Restaurant Type",
      path: "restaurant/restaurant-type",
      component: () => import("../../views/modules/restaurant/restaurantType"),
    },
    {
      name: "Restaurant Type Register",
      path: "restaurant/restaurant-type/register",
      component: () =>
        import("../../views/modules/restaurant/restaurantType/Register"),
    },
    {
      name: "Restaurant Type Edit",
      path: "restaurant/restaurant-type/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/restaurant/restaurantType/Register"),
    },
    // routes for Restaurant
    {
      name: "Restaurant",
      path: "restaurant/restaurant",
      component: () => import("../../views/modules/restaurant/restaurant"),
    },
    {
      name: "Restaurant Register",
      path: "restaurant/restaurant/register",
      component: () =>
        import("../../views/modules/restaurant/restaurant/register"),
    },
    {
      name: "Restaurant Edit",
      path: "restaurant/restaurant/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/restaurant/restaurant/register"),
    },
    // routes for Address Restaurant
    {
      name: "Address Restaurant",
      path: "restaurant/restaurant-address",
      component: () =>
        import("../../views/modules/restaurant/restaurantAddress"),
    },
    {
      name: "Address Restaurant Register",
      path: "restaurant/restaurant-address/register",
      component: () =>
        import("../../views/modules/restaurant/restaurantAddress/Register"),
    },
    {
      name: "Address Restaurant Edit",
      path: "restaurant/restaurant-address/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/restaurant/restaurantAddress/Register"),
    },

    // routes for restaurant groups

    {
      name: "Restaurant Group",
      path: "restaurant/restaurant-group",
      component: () =>
        import("../../views/modules/restaurant/restaurantGroup"),
    },
    {
      name: "Restaurant Group Register",
      path: "restaurant/restaurant-group/register",
      component: () =>
        import("../../views/modules/restaurant/restaurantGroup/Register"),
    },
    {
      name: "Restaurant Group Edit",
      path: "restaurant/restaurant-group/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/restaurant/restaurantGroup/Register"),
    },
  ],

  menu: {
    group: "/restaurant",
    title: "Restaurantes",
    icon: "mdi-food",
    children: [
      {
        title: "Tipo de Restaurante",
        icon: "mdi-comment-outline",
        to: "restaurant-type",
      },
      {
        title: "Restaurantes",
        icon: "mdi-store",
        to: "restaurant",
      },
      {
        title: "Dirección Restaurantes",
        icon: "mdi-store",
        to: "restaurant-address",
      },
      {
        title: "Agrupar Restaurantes",
        icon: "mdi-store",
        to: "restaurant-group",
      },
    ],
  },
};
