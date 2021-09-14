export default {
  routes: [
    {
      name: "Upload Images",
      path: "configuration/images",
      component: () => import("../../views/modules/configuration/images"),
    },
    {
      name: "Register Images",
      path: "configuration/images/register",
      component: () =>
        import("../../views/modules/configuration/images/Register"),
    },
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

    // routes for Delivery Cost
    {
      name: "Delivery Cost",
      path: "configuration/delivery-cost",
      component: () => import("../../views/modules/configuration/deliveryCost"),
    },
    {
      name: "Delivery Cost Register",
      path: "configuration/delivery-cost/register",
      component: () =>
        import("../../views/modules/configuration/deliveryCost/Register"),
    },
    {
      name: "Delivery Cost Edit",
      path: "configuration/delivery-cost/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/configuration/deliveryCost/Register"),
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
      {
        title: "Costo Delivery",
        icon: "mdi-comment-outline",
        to: "delivery-cost",
      },
      // {
      //   title: "Subir Imagenes",
      //   icon: "mdi-comment-outline",
      //   to: "images"
      // }
    ],
  },
};
