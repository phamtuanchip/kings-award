export default [
    {
        path: '/home/',
        component: require('./components/Home.vue')
    },
    {
        path: '/play/:Id',
        component: require('./components/Play.vue')
    },
    {
        path: '/rankings/',
        component: require('./components/Rankings.vue')
    },
  {
      path: '/about/',
      component: require('./pages/about.vue')
  },
  {
      path: '/form/',
      component: require('./pages/form.vue')
  },
  {
      path: '/dynamic-route/blog/:blogId/post/:postId/',
      component: require('./pages/dynamic-route.vue')
  },
  {
    path: '/login/',
    component: require('./components/Login.vue')
},
{
    path: '/profile/',
    component: require('./components/Profile.vue')
}
,
{
    path: '/awards/',
    component: require('./components/Awards.vue')
}
]