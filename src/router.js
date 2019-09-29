/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Ranking from './views/Ranking.vue';
import Mine from './views/Mine.vue';
import Account from './views/Account.vue';
import Search from './views/Search.vue';
import Singer from './views/Singer.vue';
import Singerdetail from './views/Singerdetail.vue';
import Singerlist from './views/Singerlist.vue';
import Singersort from './views/Singersort.vue';
import SearchRes from './components/Search/SearchRes.vue';
import ListDetails from './components/Ranking/ListDetails.vue';
import SongListsDetails from './components/Song/songListsDetails.vue';
import Albumdetail from './components/Song/albumdetail.vue';
import MVplayer from './components/Play/mvplayer.vue';
import Login from './components/Account/Login.vue';
import Register from './components/Account/Register.vue';
import Concern from './components/Account/Concern.vue';
import Fen from './components/Account/Fen.vue';
import About from './components/Account/About.vue';
import Mymessage from './components/Account/Mymessage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // 首页 发现音乐
    {
      path: '/',
      component: Home,
      name: 'Home',
    },
    {
      // 排行榜
      path: '/ranking',
      component: Ranking,
      name: 'Ranking',
    },
    {
      // 我的
      path: '/mine',
      component: Mine,
      name: 'Mine',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('id')) {
          next();
        }else{
          next({
            name:'Register'
          });
        }
      },
    },
    {
      // 账户
      path: '/account',
      component: Account,
      name: 'Account',
    },
    {
      // 排行榜详情
      path: '/listDetails',
      component: ListDetails,
      name: 'ListDetails',
    },
    {
      // 歌单详情
      path: '/songListsDetails',
      component: SongListsDetails,
      name: 'SongListsDetails',
    },
    {
      // 歌手详情
      path: '/singer',
      component: Singer,
      name: 'Singer',
    },
    {
      // 首页搜索
      path: '/search',
      component: Search,
      name: 'Search',
    },
    {
      // 首页搜索结果
      path: '/searchres',
      component: SearchRes,
      name: 'SearchRes',
    },
    {
      // 歌手详情页
      path: '/singerdetail',
      component: Singerdetail,
      name: 'Singerdetail',
    },
    {
      // 歌手分类列表
      path: '/singerlist',
      component: Singerlist,
      name: 'Singerlist',
    },
    {
      // MV
      path: '/mvplayer',
      component: MVplayer,
      name: 'mvplayer',
    },
    {
      // 歌手分类
      path: '/singersort',
      component: Singersort,
      name: 'Singersort',
    },
    {
      // 专辑详情
      path: '/albumdetail',
      component: Albumdetail,
      name: 'Albumdetail',
    },

    {
      // 邮箱登录
      path: '/login',
      component: Login,
      name: 'Login',
    },
    {
      // 关注
      path: '/concern',
      component: Concern,
      name: 'Concern',
    },
    {
      // 粉丝
      path: '/fen',
      component: Fen,
      name: 'Fen',
    },
    {
      // 关于
      path: '/about',
      component: About,
      name: 'About',
    },
    {
      // 我的消息
      path: '/mymessage',
      component: Mymessage,
      name: 'Mymessage',
    },
    {
      path: '/register',
      component: Register,
      name: 'Register',
    },
  ],
});
