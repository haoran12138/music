<template>
  <div id="app">
    <keep-alive :exclude="['SearchRes','mvplayer','singerdetail']">
      <router-view></router-view>
    </keep-alive>
    <player></player>
    <van-tabbar route>
      <van-tabbar-item :to="{name: 'Home'}" icon="music-o">发现</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Ranking'}" icon="bar-chart-o">排行榜</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Mine'}" icon="friends-o">我的音乐</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Account'}" icon="setting-o">账户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Player from "./components/Play/Player.vue";
export default {
  components: {
    Player
  }
};
</script>

<style lang="scss" scoped>
#app {
  padding: 0.4rem 0.1rem 50px;
}
</style>
