<template>
  <div class="singer">
    <div class="nav">
      <van-icon class="con" name="arrow-left" @click="$router.back(-1)" />
      <span class="title"></span>
      <van-icon @click="showPlay(true)" class="con" name="service-o" />
    </div>
    <van-tabs v-model="tabName">
      <van-tab name="Songs" title="歌曲"></van-tab>
      <van-tab name="Album" title="专辑">没写</van-tab>
      <van-tab name="video" title="视频">没写</van-tab>
      <van-tab name="mv" title="艺人信息">没写</van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "Singer",
  data() {
    return {};
  }
};
</script>
