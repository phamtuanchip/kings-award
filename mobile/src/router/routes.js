
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    redirect: 'home',
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'home', component: () => import('components/Home')},
      { path: 'rankings', component: () => import('components/Rankings')},
      { path: 'plays', component: () => import('components/Plays')},
      { path: 'play/:id', component: () => import('components/Play')},
      { path: 'user', component: () => import('components/User')},  
      { path: 'profile', component: () => import('components/Profile')},
      { path: 'children', component: () => import('components/Children')} ,
      { path: 'awards', component: () => import('components/Awards')}    
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
