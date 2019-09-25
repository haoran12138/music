<template>
  <div class="searchRes">
    <div class="nav">
      <van-icon class="con" name="arrow-left" @click="$router.back(-1)" />
      <span class="title">{{$route.query.keyword}}</span>
      <van-icon @click="showPlay(true)" class="con" name="service-o" />
    </div>
    <van-tabs v-model="tabName">
      <van-tab name="Songs" title="歌曲"></van-tab>
      <van-tab name="Singer" title="歌手"></van-tab>
      <van-tab name="SongList" title="歌单"></van-tab>
      <van-tab name="mv" title="视频">没写</van-tab>
    </van-tabs>
    <keep-alive>
      <component v-bind:is="tabName"></component>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src

import Songs from "./Songs.vue";
import Singer from "./Singer.vue";
import SongList from "./SongList.vue";
import { mapMutations } from "vuex";
export default {
  name: "searchres",
  data() {
    return {
      tabName: "songs"
    };
  },
  components: {
    Songs,
    Singer,
    SongList
  },
  methods: {
    ...mapMutations(["showPlay"])
  }
};
</script>
<style lang="scss" scoped>
.searchRes {
  padding-top: 0.4rem;
}
</style>
