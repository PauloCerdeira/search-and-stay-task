
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Login.vue') },
      { path: '/list', component: () => import('src/pages/List.vue') },
      { path: '/show', component: () => import('src/pages/Show.vue') },
      { path: '/create', component: () => import('src/pages/Create.vue') },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
