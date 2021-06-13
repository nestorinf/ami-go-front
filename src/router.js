import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";
import routers from './routes'
Vue.use(Router);

const Routes = Object.values(routers)
const routesData = []
Routes.map((routes) => {
  return routes.routes.map((r) => {
    routesData.push(r)
    return routesData
  })
})


const router = new Router({
  // mode: "history",
  // base: process.env.BASE_URL,
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },

  routes: [
    {
      path: '/',
      name: "Home",
      component: () => import("@/layouts/full-layout/Layout"),
      meta: {
        authenticated: true
      },
      children: [
        ...routesData
      ]
    },
    {
      name: "BoxedLogin",
      path: "/login",
      component: () => import("@/views/authentication/BoxedLogin"),
    },
    {
      path: "*",
      component: () => import("@/layouts/blank-layout/Blanklayout"),
    },
  ]

});

import NProgress from "nprogress";



router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authenticated)) {
    const roleUser = JSON.parse(localStorage.getItem('role_user'))
    if (!localStorage.getItem('token') || !roleUser.length) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
});

// const validRoleUser = (roles) => {
//   const valid = roles.map((element) => {
//     if (element.length > 0) {
//       return true
//     } else {
//       return false
//     }
//   })
//   return valid
// }

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
