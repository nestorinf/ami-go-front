export default {
  routes: [
    // routes for reference
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
    // routes for reference list
    {
      name: "Lista Reference",
      path: "configuration/reference-list",
      component: () =>
        import("../../views/modules/configuration/referenceList"),
    },
    {
      name: "Lista Reference Register",
      path: "configuration/reference-list/register",
      component: () =>
        import("../../views/modules/configuration/referenceList/Register"),
    },
    {
      name: "Lista Reference Edit",
      path: "configuration/reference-list/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/referenceList/Register"),
    },
  ],
  menu: {
    group: "/configuration",
    title: "Configuración",
    icon: "mdi-cog",
    children: [
      {
        title: "Referencia",
        icon: "mdi-comment-outline",
        to: "reference",
      },
      {
        title: "Lista Referencia",
        icon: "mdi-comment-outline",
        to: "reference-list",
      },
    ],
  },
};
