export default {
  routes: [
    // routes for  Market
    {
      name: "Market",
      path: "market/market",
      component: () => import("../../views/modules/market/market"),
    },
    {
      name: "Market Register",
      path: "market/market/register",
      component: () => import("../../views/modules/market/market/Register"),
    },
    {
      name: "Market Edit",
      path: "market/market/edit/:id",
      props: true,
      component: () => import("../../views/modules/market/market/Register"),
    },
    // routes for Address Market
    {
      name: "Address Market",
      path: "market/market-address",
      component: () => import("../../views/modules/market/marketAddress"),
    },
    {
      name: "Address Market Register",
      path: "market/market-address/register",
      component: () =>
        import("../../views/modules/market/marketAddress/Register"),
    },
    {
      name: "Address Market Edit",
      path: "market/market-address/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/market/marketAddress/Register"),
    },

    // route for market groups

    {
      name: "Market Group",
      path: "market/market-group",
      component: () =>
        import("../../views/modules/market/marketGroup"),
    },
    {
      name: "Market Group Register",
      path: "market/market-group/register",
      component: () =>
        import("../../views/modules/market/marketGroup/Register"),
    },
    {
      name: "Market Group Edit",
      path: "market/market-group/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/market/marketGroup/Register"),
    },
  ],
  menu: {
    group: "/market",
    title: "Automercados",
    icon: "mdi-store",
    children: [
      {
        title: "Automercados",
        icon: "mdi-comment-outline",
        to: "market",
      },
      {
        title: "Dirección Automercados",
        icon: "mdi-comment-outline",
        to: "market-address",
      },
      {
        title: "Agrupacion de Automercados",
        icon: "mdi-comment-outline",
        to: "market-group",
      },
    ],
  },
};
