export default {
  routes: [
    {
      name: "Upload Images",
      path: "configuration/images",
      component: () => import("../../views/modules/configuration/images")
    },
    {
      name: "Register Images",
      path: "configuration/images/register",
      component: () =>
        import("../../views/modules/configuration/images/Register")
    }
  ],
  menu: {
    group: "/configuration",
    title: "Configuración",
    icon: "mdi-cog",
    children: [
      {
        title: "Referencia",
        icon: "mdi-comment-outline",
        to: "refecence"
      },
      {
        title: "Lista Referencia",
        icon: "mdi-comment-outline",
        to: "refecence-list"
      },
      {
        title: "Subir Imagenes",
        icon: "mdi-comment-outline",
        to: "images"
      }
    ]
  }
};
