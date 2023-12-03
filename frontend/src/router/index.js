import { createWebHistory, createRouter } from "vue-router";
// import App from '../App.vue'
import RegisterUser from '../views/RegisterUser.vue'
import LoginUser from '../views/LoginUser.vue'
import DetailProduct from '../views/DetailProduct.vue'
import ListProduct from '../views/ListProduct.vue'

const routes = [
    {
      path: "/",
      name: "RegisterUser",
      component: RegisterUser,
    },
    {
      path: "/register",
      name: "RegisterUser",
      component: RegisterUser,
    },
    {
      path: "/login",
      name: "LoginUser",
      component: LoginUser,
    },
    {
      path: "/products",
      name: "ListProduct",
      component: ListProduct,
    },
    {
      path: "/products/:id",
      name: "DetailProduct",
      component: DetailProduct,
    },
];
  
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;