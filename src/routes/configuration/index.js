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
      name: "List Reference",
      path: "configuration/reference-list",
      component: () =>
        import("../../views/modules/configuration/referenceList"),
    },
    {
      name: "List Reference Register",
      path: "configuration/reference-list/register",
      component: () =>
        import("../../views/modules/configuration/referenceList/Register"),
    },
    {
      name: "List Reference Edit",
      path: "configuration/reference-list/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/referenceList/Register"),
    },
    // routes for frequent question
    {
      name: "Frequent Question",
      path: "configuration/frequent-question",
      component: () =>
        import("../../views/modules/configuration/frequentQuestion"),
    },
    {
      name: "Frequent Question Register",
      path: "configuration/frequent-question/register",
      component: () =>
        import("../../views/modules/configuration/frequentQuestion/Register"),
    },
    {
      name: "Frequent Question Edit",
      path: "configuration/frequent-question/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/frequentQuestion/Register"),
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
      {
        title: "Pregunta Frecuente",
        icon: "mdi-comment-outline",
        to: "frequent-question",
      },
    ],
  },
};
