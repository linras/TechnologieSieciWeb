import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'panel',
      component: () => import("./views/Panel.vue")
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    },
    {
      path: "/panel",
      name: "panel",
      component: () => import("./views/Panel.vue")
  },
  {
      path: "/sedziowie",
      name: "sedziowie",
      component: () => import("./views/Sedzia.vue")
  },
  {
      path: "/konie",
      name: "konie",
      component: () => import("./views/Kon.vue")
  },
  {
      path: "/klasy",
      name: "klasy",
      component: () => import("./views/Klasa.vue")
  },
  {
      path: "/kon/:id",
      name: "kon",
      component: () => import("./views/KonDetails.vue")
  },
  {
      path: "/sedzia/:id",
      name: "sedzia",
      component: () => import("./views/SedziaDetails.vue")
  },
  {
        path: "/admin/sedziowie/:id",
        name: "sedziowieEdit",
        //meta: {
        //    layout: "Admin",
        //    private: true
        //},
        component: () => import("./views/SedziaDetails.vue")
  },
  {
        path: "/admin/konie/:id",
        name: "konieEdit",
        //meta: {
        //    layout: "Admin",
        //    private: true
        //},
        component: () => import("./views/KonDetails.vue")
  },
  {
        path: "/admin/klasy/:id",
        name: "klasyEdit",
        //meta: {
        //    layout: "Admin",
        //    private: true
        //},
        component: () => import("./views/KlasaDetails.vue")
  },
  {
      path: "/klasa/:id",
      name: "klasa",
      component: () => import("./views/KlasaDetails.vue")
  },
  {
    path: "/klasy/new",
    name: "klasaCreate",
    component: () => import("./views/KlasaCreate.vue")
},
  {
      path: "/kon/ocena/:id",
      name: "konocena",
      component: () => import("./views/KonOcena.vue")
  }


  ]
})
