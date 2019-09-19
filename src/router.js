import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Recommend from './components/Home/Recommend.vue';
import SongList from './components/Home/SongList.vue';
import Ranking from './views/Ranking.vue';
import Mine from './views/Mine.vue';
import Account from './views/Account.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // 首页 发现音乐
    {
      path: '/',
      component: Home,
      redirect: '/recommend',
      children: [
        // 个性推荐
        {
          path: '/recommend',
          name: 'Recommend',
          component: Recommend,
        },
        // 歌单
        {
          path: '/songlist',
          name: 'SongList',
          component: SongList,
        },
        // // 主播电台
        // {
        //   path: '/',
        //   name: 'Recommend',
        //   component: Recommend,
        // },
      ],
    },
    {
      //排行榜
      path: '/ranking',
      component: Ranking,
      name: 'Ranking',
    },
    {
      //我的
      path: '/mine',
      component: Mine,
      name: 'Mine',
    },
    {
      //账户
      path: '/account',
      component: Account,
      name: 'Account',
    },
  ],
});
