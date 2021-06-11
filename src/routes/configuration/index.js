export default {

  routes: [],
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
      }

    ]
  }
};
