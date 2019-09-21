<template>
  <div class="home">
    <div class="nav">
      <van-icon class="con" name="coupon" />
      <input
        @click=" $router.push({ name: 'Search' })"
        class="search"
        type="text"
        placeholder="搜索音乐、歌词、电台"
      />
      <van-icon @click="showPlay(true)" class="con" name="coupon" />
    </div>
    <van-tabs v-model="tabName">
      <van-tab name="Recommend" title="个性推荐"></van-tab>
      <van-tab name="SongList" title="歌单"></van-tab>
      <van-tab name="Radio" title="电台"></van-tab>
    </van-tabs>
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <component v-bind:is="tabName"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import Recommend from "../components/Home/Recommend.vue";
import SongList from "../components/Home/SongList.vue";
import Radio from "../components/Home/Radio.vue";
import { mapMutations } from "vuex";

export default {
  name: "home",
  data() {
    return {
      tabName: "Recommend"
    };
  },
  components: {
    Recommend,
    SongList,
    Radio
  },
  methods: {
    ...mapMutations(["showPlay"])
  }
};
</script>
<style lang="scss" scoped>
.van-tabs__wrap .van-tabs__line {
  background-color: #444;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
.home {
  padding: 0.4rem 0.1rem 50px;
}
</style>
