<template>
  <div class="singerdetail">
    <!-- 头部 -->
    <div class="nav">
      <van-icon name="arrow-left" @click="$router.back(-1)" />
      <span class="title">{{singerdetail.name}}</span>
      <van-icon class="con" @click="showPlay(true)" name="service-o" />
    </div>
    <div class="pictop">
      <img width="100%" :src="singerdetail.picUrl" />
    </div>
    <van-tabs v-model="tabName">
      <van-tab name="hot" title="热门"></van-tab>
      <van-tab name="album" title="专辑"></van-tab>
      <van-tab name="MV" title="MV"></van-tab>
      <van-tab name="description" title="歌手信息"></van-tab>
    </van-tabs>
    <keep-alive>
      <component :is="tabName"></component>
    </keep-alive>
  </div>
</template>
<script>
import axios from "axios";
import hot from "../components/singerdetail/hot.vue";
import MV from "../components/singerdetail/MV.vue";
import description from "../components/singerdetail/description.vue";
import album from "../components/singerdetail/album.vue";
import { mapMutations } from "vuex";
export default {
  name: "singerdetail",
  data() {
    return {
      singerdetail: [],
      tabName: "hot"
    };
  },
  components: {
    hot,
    MV,
    description,
    album
  },
  methods: {
    update() {
      this.singerdetail = [];
      let id = this.$route.query.id;
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/artist/album?id=${id}`
      }).then(res => {
        this.singerdetail = res.data.artist;
      });
    },
    ...mapMutations(["showPlay"])
  },
  created() {
    this.update();
  },
  activated() {
    if (this.id != this.$route.query.id) {
      // 当xid改变时 更新数据
      this.update();
    }
  }
};
</script>
<style lang="scss" scoped>
.pictop {
  margin-top: 0.3rem;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4rem;
}
</style>
