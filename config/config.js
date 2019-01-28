export default {
  singular: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      locale: {
        enable: true,
      },
    }],
  ],
  routes: [
    {
      path: '/',
      component: '../layout',
      routes: [
        {
          path: '/',
          component: './user/list'
        },   
        { path: '/user/list', component: './user/list' }, 
      ]
    }
  ],
  proxy: {
    '/demo/': {
      target: 'http://demo.cityhouses.net',
      //changeOrigin: true,
    },
  },
  
};
