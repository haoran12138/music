<template>
  <div class="home">
    <div class="nav">
      <input class="search" type="text" placeholder="搜索音乐、歌词、电台" />
      <van-icon class="con" name="coupon" />
    </div>
    <van-tabs route>
      <van-tab :to="{name: 'Recommend'}" title="个性推荐"></van-tab>
      <van-tab :to="{name: 'SongList'}" title="歌单"></van-tab>
      <van-tab title="主播电台"></van-tab>
      <van-tab title="排行榜"></van-tab>
    </van-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>
<style scoped>
.search {
  width: 280px;
  height: 30px;
  background: #dadada;
  border: none;
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
  text-align: center;
  font-size: 12px;
}

.con {
  font-size: 24px;
}

.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}
</style>
