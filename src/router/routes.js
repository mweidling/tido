const routes = [
  {
    path: '/',
    name: 'MainView',
    component: () => import('src/views/quasar-mainview.vue'),
  },
];
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
  });
}

export default routes;