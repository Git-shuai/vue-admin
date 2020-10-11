import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: "/console",
        name: "Console",
        component: () => import("../views/console/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
