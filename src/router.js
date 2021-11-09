import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";
import routers from './routes'
Vue.use(Router);

const Routes = Object.values(routers)
const routesData = []
Routes.map((routes) => {
  return routes.routes.map((r) => {
    console.log('r',r);
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

// const checkRoles= ( roles ) => {
//   console.log(roles)
//   if (roles && roles.length > 0) {
//     const rol = roles.some(role => {
//       if (role.slug) {
//         return roles.includes(role.slug)
//       }
   
//     })

//     if (rol) {
//       return true
//     } 
//   } else {
//     throw new Error('error....')
//   }
// }

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.matched.some((record) => record.meta.authenticated)) {
    
    const roleUser = JSON.parse(sessionStorage.getItem('role_user'));

    if (!sessionStorage.getItem('token') || !roleUser.length) {
      next('/login')
    } else {
      next()
    }
    if (to.meta.roles) {
      if (!hasAccess(to.meta.roles)) {
        router.push({
          name: 'Dashboard'
        })
      } 
      next()
    }
  } else {
    next()
  }
});

function hasAccess(rolsRequired) {
 
  const rolesAuthorized = sessionStorage.getItem("role_user");

  return rolesAuthorized.includes(rolsRequired);

}
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
