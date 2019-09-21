<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar route>
      <van-tabbar-item :to="{name: 'Home'}" icon="music-o">发现</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Ranking'}" icon="bar-chart-o">排行榜</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Mine'}" icon="friends-o">我的音乐</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Account'}" icon="setting-o">账户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>

export default {};
</script>

<style lang="scss" scoped>
</style>
