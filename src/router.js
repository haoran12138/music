/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Ranking from "./views/Ranking.vue";
import Mine from "./views/Mine.vue";
import Account from "./views/Account.vue";
import Search from "./views/Search.vue";

Vue.use(Router);

export default new Router({
  routes: [
    // 首页 发现音乐
    {
      path: "/",
      component: Home,
      name: "Home"
    },
    {
      // 排行榜
      path: "/ranking",
      component: Ranking,
      name: "Ranking"
    },
    {
      // 我的
      path: "/mine",
      component: Mine,
      name: "Mine"
    },
    {
      // 账户
      path: "/account",
      component: Account,
      name: "Account"
    },
    {
      // 首页搜索
      path: "/search",
      component: Search,
      name: "Search"
    }
  ]
});
