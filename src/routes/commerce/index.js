export default {
  routes: [
    // routes for  Commerce
    {
      name: "Commerce",
      path: "commerce/commerce",
      component: () => import("../../views/modules/commerce/commerce"),
    },
    {
      name: "Commerce Register",
      path: "commerce/commerce/register",
      component: () => import("../../views/modules/commerce/commerce/Register"),
    },
    {
      name: "Commerce Edit",
      path: "commerce/commerce/edit/:id",
      props: true,
      component: () => import("../../views/modules/commerce/commerce/Register"),
    },
    // routes for category Commerce
    {
      name: "Category Commerce",
      path: "commerce/commerce-category",
      component: () => import("../../views/modules/commerce/commerceType"),
    },
    {
      name: "Category Commerce Register",
      path: "commerce/commerce-category/register",
      component: () =>
        import("../../views/modules/commerce/commerceType/Register"),
    },
    {
      name: "Category Commerce Edit",
      path: "commerce/commerce-category/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/commerce/commerceType/Register"),
    },
    // routes for Address Commerce
    {
      name: "Address Commerce",
      path: "commerce/commerce-address",
      component: () => import("../../views/modules/commerce/commerceAddress"),
    },
    {
      name: "Address Commerce Register",
      path: "commerce/commerce-address/register",
      component: () =>
        import("../../views/modules/commerce/commerceAddress/Register"),
    },
    {
      name: "Address Commerce Edit",
      path: "commerce/commerce-address/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/commerce/commerceAddress/Register"),
    },

    // route for commerce groups

    {
      name: "Commerce Group",
      path: "commerce/commerce-group",
      component: () =>
        import("../../views/modules/commerce/commerceGroup"),
    },
    {
      name: "Commerce Group Register",
      path: "commerce/commerce-group/register",
      component: () =>
        import("../../views/modules/commerce/commerceGroup/Register"),
    },
    {
      name: "Commerce Group Edit",
      path: "commerce/commerce-group/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/commerce/commerceGroup/Register"),
    },
  ],
  menu: {
    group: "/commerce",
    title: "Comercio",
    icon: "mdi-store",
    children: [
      {
        title: "Categoria de Comercio",
        icon: "mdi-comment-outline",
        to: "commerce-category",
      },

      {
        title: "Comercio",
        icon: "mdi-comment-outline",
        to: "commerce",
      },
      {
        title: "Dirección Comercio",
        icon: "mdi-comment-outline",
        to: "commerce-address",
      },
      {
        title: "Agrupacion de Comercio",
        icon: "mdi-comment-outline",
        to: "commerce-group",
      },
    ],
  },
};
