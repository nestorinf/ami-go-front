export default {

  routes: [
    {
      name: 'Upload Images',
      path: "configuration/upload-images",
      component: () => import("../../views/modules/configuration/upload-images")
  },
  ],
  menu: {
    group: '/configuration',
    title: 'Configuración',
    icon: 'mdi-cog',
    children: [
      {
        title: "Referencia",
        icon: "mdi-comment-outline",
        to: "refecence",
      },
      {
        title: "Lista Referencia",
        icon: "mdi-comment-outline",
        to: "refecence-list",
      },
      {
        title: "Subir Imagenes",
        icon: "mdi-comment-outline",
        to: "upload-images",
      }

    ]
  }
};
