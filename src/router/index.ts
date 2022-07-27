import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/basic/node",
    name: "node",
    component: () =>
      import(/* webpackChunkName: "node" */ "../views/basic/node"),
  },
  {
    path: "/basic/edge",
    name: "edge",
    component: () =>
      import(/* webpackChunkName: "edge" */ "../views/basic/edge"),
  },
  {
    path: "/basic/dnd",
    name: "dnd",
    component: () => import(/* webpackChunkName: "dnd" */ "../views/basic/dnd"),
  },
  {
    path: "/extension/bpmn",
    name: "bpmn",
    component: () =>
      import(/* webpackChunkName: "bpmn" */ "../views/extension/bpmn/Index"),
  },
  {
    path: "/extension/approve",
    name: "approve",
    component: () =>
      import(/* webpackChunkName: "approve" */ "../views/extension/approve"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
