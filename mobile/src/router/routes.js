
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    redirect: 'home',
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'home', component: () => import('components/Home')},
      { path: 'user', component: () => import('components/User'), children: [
        { path: 'profile', component: () => import('components/Profile')},
      ]}
       
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
