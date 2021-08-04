export default {
  routes: [
    // routes for  Geofence
    {
      name: "Geofence",
      path: "geofence/geofence",
      component: () => import("../../views/modules/geofence/geofence"),
    },
    {
      name: "Geofence Register",
      path: "geofence/geofence/register",
      component: () => import("../../views/modules/geofence/geofence/Register"),
    },
    {
      name: "Geofence Edit",
      path: "geofence/geofence/edit/:id",
      props: true,
      component: () => import("../../views/modules/geofence/geofence/Register"),
    },
    {
      name: "Geofence General",
      path: "geofence/geofence-general",
      component: () => import("../../views/modules/geofence/geofenceGeneral"),
    },
  ],
  menu: {
    group: "/geofence",
    title: "GeoCerca",
    icon: "mdi-google-maps",
    children: [
      {
        title: "GeoCerca",
        icon: "mdi-comment-outline",
        to: "geofence",
      },
      {
        title: "GeoCerca General",
        icon: "mdi-comment-outline",
        to: "geofence-general",
      },
    ],
  },
};
