<template>
  <div class="hotsinger">
    <div class="top">
      <van-icon name="arrow-left" />
      <span>
        华语男歌手
        <van-icon name="arrow-down" />
      </span>
      <van-icon name="bar-chart-o" />
    </div>
    <div>
      <div v-for="(item,index) in hotsinger" :key="index">
        <van-card :title="item.name+'   ' +(item.alias)" :thumb=" item.img1v1Url " />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "hotsinger",
  data() {
    return {
      hotsinger: []
    };
  },
  created() {
    axios({
      type: "get",
      url: "http://47.104.88.123:3000/artist/list"
    }).then(res => {
      this.hotsinger = res.data.artists;
    });
  }
};
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.15rem;
  height: 0.4rem;
  color: #898b86;
}
</style>
