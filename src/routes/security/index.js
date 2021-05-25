export default {
    path: '/security',
    name:'Security',
    children:[
        {
            name:'Form1',
          path: "/form/chat",
          component: () => import("@/views/apps/chat/Chat")
        }
    ]
}