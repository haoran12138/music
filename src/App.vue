<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item :to="{name: 'Recommend'}"  icon="home-o">发现音乐</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Ranking'}" icon="friends-o">排行榜</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Mine'}" icon="friends-o">我的音乐</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Account'}" icon="setting-o">账户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {};
</script>

<style>

</style>
