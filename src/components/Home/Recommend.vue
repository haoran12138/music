<template>
  <div class="recommend">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.bannerId">
        <img :src="item.pic" alt />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "recommend",
  data() {
    return {
      banners: []
    };
  },
  components: {},
  created() {
    axios({
      type: "get",
      url: "http://47.104.88.123:3000/banner?type=2"
    }).then(res => {
      this.banners = res.data.banners;
    });
  }
};
</script>
<style scoped lang="scss">
.van-swipe {
  img {
    width: 100%;
  }
}
</style>
