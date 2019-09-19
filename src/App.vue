<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item :to="{name: 'Home'}" icon="home-o">发现音乐</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Ranking'}" icon="friends-o">排行榜</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Mine'}" icon="friends-o">我的音乐</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Account'}" icon="setting-o">账户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Home from "./views/Home";
export default {};
</script>

<style lang="scss" scoped>
@import "./common/background.scss";


</style>
